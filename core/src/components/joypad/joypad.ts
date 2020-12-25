import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { BUTTONS, BUTTONS_BITS } from "./types";
import { JOYPAD_BITS } from "./constants";
import { RequestJoypadInterruptEvent } from "../event-bus/events/REQUEST_JOYPAD_INTERRUPT";

class Joypad {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);

    constructor (eventBus: EventBus, memory: Memory) {
        this.eventBus = eventBus;
        this.memory = memory;
    }

    public buttonPressed = (button: BUTTONS) => {
        const currentState = this.memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        const checkDirectionKeys = !numberUtils.isBitSet(currentState, JOYPAD_BITS.CHECK_DIRECTION_ARROWS);
        const buttonBit = BUTTONS_BITS[button];
        // 0 bit value is pressed and 1 is not pressed
        const isCurrentlyPressed = !numberUtils.isBitSet(currentState, buttonBit);
        if (isCurrentlyPressed) {
            return;
        }
        const newState = numberUtils.unsetBit(currentState, buttonBit);
        this.memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, newState);

        if (checkDirectionKeys && (button === BUTTONS.DOWN || button === BUTTONS.UP || button === BUTTONS.LEFT || button === BUTTONS.RIGHT)) {
            this.eventBus.emit(new RequestJoypadInterruptEvent());
            return;
        }

        if (!checkDirectionKeys && (button === BUTTONS.A || button === BUTTONS.B || button === BUTTONS.SELECT || button === BUTTONS.START)) {
            this.eventBus.emit(new RequestJoypadInterruptEvent());
            return;
        }
    }

    public buttonReleased = (button: BUTTONS) => {
        const currentState = this.memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        const buttonBit = BUTTONS_BITS[button];
        const newState = numberUtils.setBit(currentState, buttonBit);
        this.memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, newState);
    }
}

export default Joypad;