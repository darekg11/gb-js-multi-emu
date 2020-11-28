import EventBus from "../event-bus";
import Memory from "../memory";
import REGISTERS from "../memory/constants";
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