import Memory from "./memory";
import MemoryOutOfBoundError from "../../errors/MemoryOutOfBoundError";
import EventBus from "../event-bus";
import REGISTERS from "./constants";

const MEMORY_SIZE = 65536;

describe("read8BitsValue + write8BitsValue", () => {
    test("should throw MemoryOutOfBoundError when accessing memory below 0 index", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read8BitsValue(-1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory at exact size", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read8BitsValue(MEMORY_SIZE) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory above upper bound", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read8BitsValue(MEMORY_SIZE + 1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should return value", () => {
        const TEST_INDEX = 10;
        const TEST_VALUE = 190;
        const memory = new Memory(new EventBus);
        memory.write8BitsValue(TEST_INDEX, TEST_VALUE);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    })
});

describe("read16BitsValue + write16BitsValue", () => {
    test("should throw MemoryOutOfBoundError when accessing memory below 0 index", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read16BitsValue(-1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory at exact size", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read16BitsValue(MEMORY_SIZE) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory above upper bound", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read16BitsValue(MEMORY_SIZE - 1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory above upper bound", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read16BitsValue(MEMORY_SIZE) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when accessing memory above upper bound", () => {
        const memory = new Memory(new EventBus);
        expect(() => { memory.read16BitsValue(MEMORY_SIZE + 1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should return value", () => {
        const TEST_INDEX = 10;
        const TEST_VALUE = 40987;
        const memory = new Memory(new EventBus);
        memory.write16BitsValue(TEST_INDEX, TEST_VALUE);
        expect(memory.read16BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    })
})

describe("DIV Register Write", () => {
    test("write anything to DIV Timer Register should reset it to 0", () => {
        const memory = new Memory(new EventBus);
        memory.directWrite8BitsValue(REGISTERS.TIMERS.DIV_REGISTER, 20);

        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(20);

        memory.write8BitsValue(REGISTERS.TIMERS.DIV_REGISTER, 100);
        expect(memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER)).toBe(0);
    })
})

describe("DMA transfer", () => {
    test("should copy bytes correctly", () => {
        const memory = new Memory(new EventBus);
        const dmaValue = 78;
        const sourceIndex = 78 << 8;
        for (let cnt = 0; cnt < 0xA0; cnt++) {
            memory.write8BitsValue(sourceIndex + cnt, cnt + 1);
        }

        // check if currently OAM is empty
        for (let cnt = 0; cnt < 0xA0; cnt++) {
            expect(memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + cnt)).toBe(0);
        }

        // execute DMA transfer
        memory.write8BitsValue(REGISTERS.MEMORY.DMA_TRANSFER_START_REGISTER, dmaValue);

        // check if OAM has copied values
        for (let cnt = 0; cnt < 0xA0; cnt++) {
            expect(memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + cnt)).toBe(cnt + 1);
        }
    });
});