import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { LCD_ENABLE_REGISTER_BIT, LCD_MODES } from "./constants";

class GPU {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);
    private ticks = 0;
    private mode = LCD_MODES.OAM;

    constructor (eventBus: EventBus, memory: Memory) {
        this.eventBus = eventBus;
        this.memory = memory;
    }

    public update (cyclesElapsed: number) {

        // when LCD is disabled do not do anything
        if (!this.isLCDEnabled()) {
            return;
        }
        this.ticks += cyclesElapsed;

        switch (this.mode) {
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

    private isLCDEnabled = () => {
        return numberUtils.isBitSet(this.memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER), LCD_ENABLE_REGISTER_BIT);
    }


}

export default GPU;