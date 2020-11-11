import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER", () => {
    test("Should set value correctly and increase PC by 1 and increment HL", () => {
        const TEST_VALUE = 198;
        const TEST_INDEX = 51980;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(0);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(0);

        cpu.setRegisterHLValue(TEST_INDEX);
        cpu.setRegisterAValue(TEST_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(TEST_VALUE);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(TEST_INDEX + 1 >> 8);
        expect(cpu.getRegisterLValue()).toBe(TEST_INDEX + 1 & 0x00FF);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(TEST_INDEX + 1);
        expect(cpu.getRegisterAFValue()).toBe(TEST_VALUE << 8);
        expect(cpu.getProgramCounter()).toBe(1);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    });
})