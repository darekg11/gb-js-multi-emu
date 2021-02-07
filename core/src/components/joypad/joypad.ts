import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { BUTTONS } from "./types";
import { RequestJoypadInterruptEvent } from "../event-bus/events/REQUEST_JOYPAD_INTERRUPT";

/*
    This implementation is using internal state (1 byte) to assign each button a unique bit.
    During each update, we are checking which buttons the game wishes to check and save correctly
    prepared state value to 0xFF00 register
*/
class Joypad {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);
    private state: number = 0;
    private buttonToUniqueBitMap = {
        [BUTTONS.START]:  0b10000000,
        [BUTTONS.SELECT]: 0b01000000,
        [BUTTONS.B]:      0b00100000,
        [BUTTONS.A]:      0b00010000,
        [BUTTONS.DOWN]:   0b00001000,
        [BUTTONS.UP]:     0b00000100,
        [BUTTONS.LEFT]:   0b00000010,
        [BUTTONS.RIGHT]:  0b00000001
    }

    constructor (eventBus: EventBus, memory: Memory) {
        this.eventBus = eventBus;
        this.memory = memory;
    }

    public update = () => {
        const currentState = this.memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        // flip each bit so 1 would actually mean that button is pressed
        // by default (hardware) 0 means that button is pressed
        const inverted = ~currentState;
        let newState = inverted & 0x30;
        // direction buttons
        if (newState & 0x10) {
            // get only 4 lower bits since direction buttons are in those 4 lower bits
            newState |= (this.state & 0x0F);
        } else if (newState & 0x20) {
            // select buttons
            // get upper 4 bits and shift it since in final value bits 0 - 3 are reserved for buttons
            newState |= ((this.state & 0xF0) >> 4);
        } else if ((newState & 0x30) === 0) {
            // nothing
            // 0xF0 === 11110000 so every lower bit (0 - 3) will be finally flipped to 1 which means unpressed
            // and every upper bit (4 - 7) will be finally flipped to 0000 meaning nothing selected
            newState &= 0xF0;
        }

        // 0x3F === 0011111 since bit 6 and 7 is not used for anything do not write it
        newState = ((~newState) & 0x3F); // invert back
        this.memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, newState);
    }

    public buttonPressed = (button: BUTTONS) => {
        this.state |= this.buttonToUniqueBitMap[button];
        this.eventBus.emit(new RequestJoypadInterruptEvent());
    }

    public buttonReleased = (button: BUTTONS) => {
        const mask = 0xFF - this.buttonToUniqueBitMap[button];
        this.state &= mask;
    }

    public reset = () => {
        this.state = 0;
    }
}

export default Joypad;