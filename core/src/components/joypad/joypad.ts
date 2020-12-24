import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { BUTTONS } from "./types";
import { JOYPAD_BITS } from "./constants";

class Joypad {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);

    constructor (eventBus: EventBus, memory: Memory) {
        this.eventBus = eventBus;
        this.memory = memory;
    }

    public buttonPressed = (button: BUTTONS) => {
        const currentState = this.memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        const checkDirectionKeys = numberUtils.isBitSet(currentState, JOYPAD_BITS.CHECK_DIRECTION_ARROWS);
    }

    public buttonReleased = (button: BUTTONS) => {
        const currentState = this.memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        const checkDirectionKeys = numberUtils.isBitSet(currentState, JOYPAD_BITS.CHECK_DIRECTION_ARROWS);
    }
}

export default Joypad;