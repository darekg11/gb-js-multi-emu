import EventBus from "../../event-bus";
import REGISTERS from "../../memory/constants";
import Memory from "../../memory";
import DivTimer from "./div";
import { CLASSIC_GAMEBOY_CLOCK_SPEED } from "../../contants";

describe("initialize", () => {
    test("should create new instance of DIV timer without crashing", () => {
        const eventBus = new EventBus();
        const timer = new DivTimer(eventBus, new Memory(eventBus));
        expect(timer).toBeDefined();
    });
});

describe("update", () => {
    test("should update with frequency of 16384 Hz", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const timer = new DivTimer(eventBus, memory);

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 16384;

        timer.update(requiredTicksToTriggerInterrupt);
        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(2);
    });

    test("should overflow to 0 with frequency of 16384 Hz", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const timer = new DivTimer(eventBus, memory);

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 16384;

        for (let cnt = 0; cnt < 0xFF; cnt ++) {
            timer.update(requiredTicksToTriggerInterrupt + 1);
        }
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0xFF);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt + 1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0);
    });

    test("should update with frequency of 16384 Hz with double speed", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const timer = new DivTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 16384) * 2;

        timer.update(requiredTicksToTriggerInterrupt);
        // check if value is increased
        timer.update(1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(1);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt - 1);
        timer.update(1);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(2);
    });

    test("should overflow to 0 with frequency of 16384 Hz with double speed", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const timer = new DivTimer(eventBus, memory, CLASSIC_GAMEBOY_CLOCK_SPEED, true);

        const requiredTicksToTriggerInterrupt = (CLASSIC_GAMEBOY_CLOCK_SPEED / 16384) * 2;

        for (let cnt = 0; cnt < 0xFF; cnt ++) {
            timer.update(requiredTicksToTriggerInterrupt + 1);
        }
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0xFF);

        // check once more to see if ticks of timer are actually decreased
        timer.update(requiredTicksToTriggerInterrupt + 1);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0);
    });
});

describe("reset", () => {
    test("should reset the counter", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        const timer = new DivTimer(eventBus, memory);

        const requiredTicksToTriggerInterrupt = CLASSIC_GAMEBOY_CLOCK_SPEED / 16384;

        for (let cnt = 0; cnt < 10; cnt ++) {
            timer.update(requiredTicksToTriggerInterrupt + 1);
        }
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(10);

        // reset
        timer.reset();
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0);
    });
});