import EventBus from "../event-bus";
import { EVENT_TYPES } from "../event-bus/types";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import Joypad from "./joypad";
import { BUTTONS } from "./types";

describe("initialize", () => {
    test("should create new instance of joypad without crashing", () => {
        const eventBus = new EventBus();
        const joypad = new Joypad(eventBus, new Memory(eventBus));
        expect(joypad).toBeDefined();
    });
});

describe("key press", () => {
    test("pressing button should not change anything if button is already pressed", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadInterruptCallback = jest.fn(data => data);
        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
            callback: joypadInterruptCallback
        });

        const joypadRegisterState = 0b00100111;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonPressed(BUTTONS.DOWN);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00100111);
        expect(joypadInterruptCallback.mock.calls.length).toBe(0);
    });
    describe("DOWN button", () => {
        test("pressing button should change bit and execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.DOWN);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00100111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.DOWN);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00010111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("UP button", () => {
        test("pressing button should change bit and execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.UP);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.UP);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("LEFT button", () => {
        test("pressing button should change bit and execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.LEFT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.LEFT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("RIGHT button", () => {
        test("pressing button should change bit and execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.RIGHT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.RIGHT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("START button", () => {
        test("pressing button should change bit and execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.START);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00010111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.START);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00100111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("SELECT button", () => {
        test("pressing button should change bit and execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.SELECT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.SELECT);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("B button", () => {
        test("pressing button should change bit and execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.B);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.B);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
    describe("A button", () => {
        test("pressing button should change bit and execute interrupt when buttons are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00011111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.A);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });

        test("pressing button should change bit but do not execute interrupt when direction keys are requested", () => {
            const eventBus = new EventBus();
            const memory = new Memory(eventBus);
            const joypad = new Joypad(eventBus, memory);
    
            const joypadInterruptCallback = jest.fn(data => data);
            eventBus.addHandler({
                type: EVENT_TYPES.REQUEST_JOYPAD_INTERRUPT,
                callback: joypadInterruptCallback
            });
    
            const joypadRegisterState = 0b00101111;
            memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);
    
            joypad.buttonPressed(BUTTONS.A);
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(0);
        });
    });
});

describe("key release", () => {
    test("DOWN", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.DOWN);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11111000);
    });
    test("DOWN", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.UP);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110100);
    });
    test("LEFT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.LEFT);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110010);
    });
    test("RIGHT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.RIGHT);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110001);
    });
    test("START", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.START);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11111000);
    });
    test("SELECT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.SELECT);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110100);
    });
    test("B", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.B);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110010);
    });
    test("A", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b11110000;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.A);

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b11110001);
    });
});