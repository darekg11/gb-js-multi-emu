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
    describe("DOWN button", () => {
        test("pressing button should change bit and execute interrupt", () => {
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
            joypad.update();

            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00100111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();

            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();

            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00101110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00010111);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011011);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011101);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
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
            joypad.update();
    
            const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
            expect(joypadState).toBe(0b00011110);
            expect(joypadInterruptCallback.mock.calls.length).toBe(1);
            expect(joypadInterruptCallback.mock.calls[0][0]).toMatchObject({});
        });
    });
});

describe("key release", () => {
    test("DOWN", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00100111;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.DOWN);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00101111);
    });
    test("UP", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00101011;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.UP);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00101111);
    });
    test("LEFT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00101101;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.LEFT);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00101111);
    });
    test("RIGHT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00101110;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.RIGHT);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00101111);
    });
    test("START", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00010111;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.START);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00011111);
    });
    test("SELECT", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00011011;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.SELECT);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00011111);
    });
    test("B", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00011101;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.B);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00011111);
    });
    test("A", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const joypad = new Joypad(eventBus, memory);

        const joypadRegisterState = 0b00011110;
        memory.directWrite8BitsValue(REGISTERS.JOYPAD.STATE, joypadRegisterState);

        joypad.buttonReleased(BUTTONS.A);
        joypad.update();

        const joypadState = memory.read8BitsValue(REGISTERS.JOYPAD.STATE);
        expect(joypadState).toBe(0b00011111);
    });
});