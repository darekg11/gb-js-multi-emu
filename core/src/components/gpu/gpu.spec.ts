import { numberUtils } from "../../utils";
import EventBus from "../event-bus";
import { EVENT_TYPES } from "../event-bus/types";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
import { STATE_COINCIDENCE_FLAG_BIT } from "./constants";
import GPU from "./gpu";

describe("initialize", () => {
    test("should create new instance of GPU without crashing", () => {
        const eventBus = new EventBus();
        const gpu = new GPU(eventBus, new Memory(eventBus));
        expect(gpu).toBeDefined();
    });
});

describe("update when LCD disabled", () => {
    test("should reset LY_REGISTER and set LCD Mode to 1", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        memory.directWrite8BitsValue(REGISTERS.GPU.LY_REGISTER, 128);
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 255);

        const gpu = new GPU(eventBus, memory);

        gpu.update(100);

        expect(memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER)).toBe(0);
        expect(memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER)).toBe(0b11111101);
    })
});

describe("update when LCD enabled - HBLANK mode", () => {
    test("updating should increase LY Register", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        // Enable LCD
        memory.write8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER, 255);
        // Configure LCD - Mode 0
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 0b11111100);

        const gpu = new GPU(eventBus, memory);
        // together 204 ticks - one scanline
        gpu.update(100);
        gpu.update(104);

        expect(memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER)).toBe(1);
    })

    test("updating should turn off Coincidence flag if LY Register !== LYC Register", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        // Enable LCD
        memory.write8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER, 255);
        // Configure LCD - Mode 0
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 0b11111100);

        const gpu = new GPU(eventBus, memory);
        // together 204 ticks - one scanline
        gpu.update(100);
        gpu.update(104);

        const newLCDStat = memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER);

        expect(numberUtils.isBitSet(newLCDStat, STATE_COINCIDENCE_FLAG_BIT)).toBeFalsy();
    })

    test("updating should change mode to OAM", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);

        // Enable LCD
        memory.write8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER, 255);
        // Configure LCD - Mode 0
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 0b11111100);

        const gpu = new GPU(eventBus, memory);
        // together 204 ticks - one scanline
        gpu.update(100);
        gpu.update(104);

        expect(memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER)).toBe(0b11111010);
    })

    test("updating should change mode to OAM and generate interrupt if enabled", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const mockCallback = jest.fn(data => data);

        // Configure bus to catch LCD interrupt
        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_LCD_INTERRUPT,
            callback: mockCallback
        });

        // Enable LCD
        memory.write8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER, 255);
        // Configure LCD - Mode 0
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 0b11111100);

        const gpu = new GPU(eventBus, memory);
        // together 204 ticks - one scanline
        gpu.update(100);
        gpu.update(104);

        expect(memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER)).toBe(0b11111010);
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toMatchObject({});
    })

    test("updating should change mode to OAM and not generate interrupt if disabled", () => {
        const eventBus = new EventBus();
        const memory = new Memory(eventBus);
        const mockCallback = jest.fn(data => data);

        // Configure bus to catch LCD interrupt
        eventBus.addHandler({
            type: EVENT_TYPES.REQUEST_LCD_INTERRUPT,
            callback: mockCallback
        });

        // Enable LCD
        memory.write8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER, 255);
        // Configure LCD - every interrupt disabled
        memory.write8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER, 0b10000100);

        const gpu = new GPU(eventBus, memory);
        // together 204 ticks - one scanline
        gpu.update(100);
        gpu.update(104);

        expect(memory.read8BitsValue(REGISTERS.GPU.LCD_STAT_REGISTER)).toBe(0b10000010);
        expect(mockCallback.mock.calls.length).toBe(0);
    })
});