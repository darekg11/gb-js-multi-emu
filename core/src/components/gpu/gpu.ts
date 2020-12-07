import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import { RequestLCDInterruptEvent } from "../event-bus/events/REQUEST_LCD_INERRUPT";
import { RequestVBLANKInterruptEvent } from "../event-bus/events/REQUEST_VBLANK_INTERRUPT";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import {
    LCD_ENABLE_REGISTER_BIT,
    STATE_COINCIDENCE_FLAG_BIT,
    STATE_HBLANK_INTERRUPT_BIT,
    STATE_VBLANK_INTERRUPT_BIT,
    STATE_OAM_INTERRUPT_BIT,
    STATE_COINCIDENCE_INTERRUPT_BIT,
    LCD_MODES,
    HBLANK_CPU_CYCLES,
    VBLANK_START_SCANLINE,
    MAX_SCANLINES,
    LCD_WIDTH,
    LCD_HEIGHT,
    OAM_MODE_CPU_CYCLES,
    SCANLINE_CPU_CYCLES,
    DMA_MODE_CPU_CYCLES
} from "./constants";
import { IRenderer } from "./renderers/types";
import { ClassicRenderer } from "./renderers";

class GPU {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);
    private ticks = 0;
    // it's WIDTH * HEIGHT * 4 bytes per each pixel
    // RGBA format
    private pixelBuffer = new Uint8ClampedArray(LCD_WIDTH * LCD_HEIGHT * 4);
    private pixelRenderer: IRenderer = new ClassicRenderer();

    constructor (eventBus: EventBus, memory: Memory) {
        this.eventBus = eventBus;
        this.memory = memory;
    }

    public update (cyclesElapsed: number) {
        // when LCD is disabled do not do anything
        if (!this.isLCDEnabled()) {
            this.setupLCDWhenDisabled();
            return;
        }

        this.ticks += cyclesElapsed;
        const stat = this.memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER);
        const mode = stat & (1 << 2) - 1;
        switch (mode) {
            case LCD_MODES.HBLANK: {
                if (this.ticks >= HBLANK_CPU_CYCLES) {
                    this.ticks -= HBLANK_CPU_CYCLES;
                    const linesCount = this.updateLYRegister();
                    if (linesCount === VBLANK_START_SCANLINE) {
                        this.changeMode(LCD_MODES.VLABNK);
                        this.eventBus.emit(new RequestVBLANKInterruptEvent(this.pixelBuffer));
                    } else {
                        this.changeMode(LCD_MODES.OAM);
                    }
                }
                break;
            }
            case LCD_MODES.VLABNK: {
                if (this.ticks >= SCANLINE_CPU_CYCLES) {
                    this.ticks -= SCANLINE_CPU_CYCLES;
                    const currentLine = this.memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
                    if (currentLine >= MAX_SCANLINES) {
                        this.changeMode(LCD_MODES.OAM);
                    }
                    this.updateLYRegister();
                }
                break;
            }
            case LCD_MODES.OAM: {
                if (this.ticks >= OAM_MODE_CPU_CYCLES) {
                    this.ticks -= OAM_MODE_CPU_CYCLES;
                    this.changeMode(LCD_MODES.DMA);
                }
                break;
            }
            case LCD_MODES.DMA: {
                if (this.ticks >= DMA_MODE_CPU_CYCLES) {
                    this.ticks -= DMA_MODE_CPU_CYCLES;
                    this.pixelBuffer = this.pixelRenderer.drawScanLine(this.memory);
                    this.changeMode(LCD_MODES.HBLANK);
                }
                break;
            }
        }
    }

    private setupLCDWhenDisabled = () => {
        this.ticks = 0;
        // when LCD is disabled then mode should be set to VBLANK (1)
        // and scanline should be reset. In other cases some games such as
        // Mario2 won't play past title screen
        
        // writing anything via memory to LY_REGISTER resets it anyway
        this.memory.write8BitsValue(REGISTERS.GPU.LY_REGISTER, 0);
        
        // set mode to 1 (VBLANK)
        // binary 01
        let status = this.memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER);
        status = numberUtils.setBit(status, 0);
        status = numberUtils.unsetBit(status, 1);
        this.memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, status);

    }

    private isLCDEnabled = () => {
        return numberUtils.isBitSet(this.memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER), LCD_ENABLE_REGISTER_BIT);
    }

    private updateLYRegister = () => {
        const currentLine = this.memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
        const status = this.memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER);
        const newCurrentLine = currentLine >= MAX_SCANLINES ? 0 : currentLine + 1;
        this.memory.directWrite8BitsValue(REGISTERS.GPU.LY_REGISTER, newCurrentLine);
        if (this.memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER) === this.memory.read8BitsValue(REGISTERS.GPU.LYC_REGISTER)) {
            const statusWithCoincidenceFlagSet = numberUtils.setBit(status, STATE_COINCIDENCE_FLAG_BIT);
            this.memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, statusWithCoincidenceFlagSet);
            const isCoincidenceInterruptEnabled = numberUtils.isBitSet(status, STATE_COINCIDENCE_INTERRUPT_BIT);
            if (isCoincidenceInterruptEnabled) {
                this.eventBus.emit(new RequestLCDInterruptEvent());
            }
        } else {
            const statusWithoutCoincidenceFlagSet = numberUtils.unsetBit(status, STATE_COINCIDENCE_FLAG_BIT);
            this.memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, statusWithoutCoincidenceFlagSet);
        }
        return newCurrentLine;
    }

    private changeMode = (mode: LCD_MODES) => {
        const status = this.memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER);
        // 252 === 11111100
        // so it will copy every bit that is set to 1 and leave 00 in MODE
        let newStatus = status & 252;
        // now merge last two 00 with actual new mode to set
        newStatus |= mode;
        this.memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, newStatus);
        if ((mode === LCD_MODES.HBLANK && numberUtils.isBitSet(status, STATE_HBLANK_INTERRUPT_BIT)) ||
            (mode === LCD_MODES.VLABNK && numberUtils.isBitSet(status, STATE_VBLANK_INTERRUPT_BIT)) ||
            (mode === LCD_MODES.OAM && numberUtils.isBitSet(status, STATE_OAM_INTERRUPT_BIT))) {
                this.eventBus.emit(new RequestLCDInterruptEvent());
            }
    }
}

export default GPU;