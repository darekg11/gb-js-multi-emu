import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { LCD_ENABLE_REGISTER_BIT, LCD_MODES } from "./constants";

class GPU {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);
    private ticks = 0;

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
                break;
            }
            case LCD_MODES.VLABNK: {
                break;
            }
            case LCD_MODES.OAM: {
                break;
            }
            case LCD_MODES.DMA: {
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
}

export default GPU;