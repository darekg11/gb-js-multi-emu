import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS", () => {
    test("Should set value correctly and increase PC by 3", () => {
        const TEST_VALUE_FIRST_HALF = 0xEA;
        const TEST_VALUE_SECOND_HALF = 0xDD;
        const TEST_VALUE_COMBINED = 0xEADD;
        const cpu = new CPU();
        const memory = new Memory();
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

        memory.write8BitsValue(1, TEST_VALUE_FIRST_HALF);
        memory.write8BitsValue(2, TEST_VALUE_SECOND_HALF);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(TEST_VALUE_FIRST_HALF);
        expect(cpu.getRegisterEValue()).toBe(TEST_VALUE_SECOND_HALF);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(TEST_VALUE_COMBINED);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(3);
        expect(memory.read16BitsValue(1)).toBe(TEST_VALUE_COMBINED);
    });
})