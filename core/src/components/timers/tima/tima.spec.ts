import EventBus from "../../event-bus";
import { EVENT_TYPES } from "../../event-bus/types";
import REGISTERS from "../../memory/constants";
import Memory from "../../memory";
import TimaTimer from "./tima";
import { CLASSIC_GAMEBOY_CLOCK_SPEED } from "../../contants";

describe("initialize", () => {
    test("should create new instance of TIMA timer without crashing", () => {
        const eventBus = new EventBus();
        const timer = new TimaTimer(eventBus, new Memory(eventBus));
        expect(timer).toBeDefined();
    });
});

describe("update", () => {
    test("should not update when timer is disabled", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        // pretend to run a lot of cycles to try to trigger update
        timer.update(100000);

        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);
    });

    test("should update with frequency of 4096 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 4; // 100 so it's enabled and set to 4096 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 1024;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should update with frequency of 4096 Hz with double speed", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 4; // 100 so it's enabled and set to 4096 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 1024) * 2;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should generate interrupt with frequency of 4096 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tmaRegisterValue = 10; // after timer overflow, set value to this
        const tacRegisterValue = 4; // 100 so it's enabled and set to 4096 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        memory.write8BitsValue(REGISTERS.TIMERS.TMA_REGISTER, tmaRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 1024;

        for (let cnt = 0; cnt < 0xFF; cnt++) {
            timer.update(requiredTicksToTriggerInterrupt);
        }
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // generate interrupt
        timer.update(requiredTicksToTriggerInterrupt);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(tmaRegisterValue);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(1);
        expect(requestTimaTimerInterruptCallback.mock.calls[0][0]).toMatchObject({});
    });

    test("should update with frequency of 16384 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 7; // 111 so it's enabled and set to 16384 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 256;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should update with frequency of 16384 Hz with double speed", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 7; // 100 so it's enabled and set to 16384 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 256) * 2;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should generate interrupt with frequency of 16384 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tmaRegisterValue = 10; // after timer overflow, set value to this
        const tacRegisterValue = 7; // 100 so it's enabled and set to 16384 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        memory.write8BitsValue(REGISTERS.TIMERS.TMA_REGISTER, tmaRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 256;

        for (let cnt = 0; cnt < 0xFF; cnt++) {
            timer.update(requiredTicksToTriggerInterrupt);
        }
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // generate interrupt
        timer.update(requiredTicksToTriggerInterrupt);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(tmaRegisterValue);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(1);
        expect(requestTimaTimerInterruptCallback.mock.calls[0][0]).toMatchObject({});
    });

    test("should update with frequency of 65536 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 6; // 110 so it's enabled and set to 65536 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 64;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should update with frequency of 65536 Hz with double speed", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 6; // 110 so it's enabled and set to 65536 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 64) * 2;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should generate interrupt with frequency of 65536 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tmaRegisterValue = 10; // after timer overflow, set value to this
        const tacRegisterValue = 6; // 110 so it's enabled and set to 65536 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        memory.write8BitsValue(REGISTERS.TIMERS.TMA_REGISTER, tmaRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 64;

        for (let cnt = 0; cnt < 0xFF; cnt++) {
            timer.update(requiredTicksToTriggerInterrupt);
        }
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // generate interrupt
        timer.update(requiredTicksToTriggerInterrupt);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(tmaRegisterValue);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(1);
        expect(requestTimaTimerInterruptCallback.mock.calls[0][0]).toMatchObject({});
    });

    test("should update with frequency of 262144 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 5; // 101 so it's enabled and set to 262144 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 16;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should update with frequency of 262144 Hz with double speed", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tacRegisterValue = 5; // 101 so it's enabled and set to 262144 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        const timer = new TimaTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 16) * 2;

        timer.update(requiredTicksToTriggerInterrupt - 1);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(2);
    });

    test("should generate interrupt with frequency of 262144 Hz", () => {
        const requestTimaTimerInterruptCallback = jest.fn(data => data);
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const tmaRegisterValue = 10; // after timer overflow, set value to this
        const tacRegisterValue = 5; // 101 so it's enabled and set to 262144 Hz mode
        memory.write8BitsValue(REGISTERS.TIMERS.TAC_REGISTER, tacRegisterValue);
        memory.write8BitsValue(REGISTERS.TIMERS.TMA_REGISTER, tmaRegisterValue);
        const timer = new TimaTimer(eventBus, memory);

        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
            callback: requestTimaTimerInterruptCallback
        });

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 16;

        for (let cnt = 0; cnt < 0xFF; cnt++) {
            timer.update(requiredTicksToTriggerInterrupt);
        }
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(0);

        // generate interrupt
        timer.update(requiredTicksToTriggerInterrupt);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER)).toBe(tmaRegisterValue);
        expect(requestTimaTimerInterruptCallback.mock.calls.length).toBe(1);
        expect(requestTimaTimerInterruptCallback.mock.calls[0][0]).toMatchObject({});
    });
})