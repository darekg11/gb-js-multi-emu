import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER", () => {
    test("Should set value correctly and increase PC by 2", () => {
        const TEST_VALUE = 198;
        const TEST_INDEX = 41001;
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
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(0);

        memory.write8BitsValue(TEST_INDEX, TEST_VALUE);
        cpu.setRegisterDEValue(TEST_INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(TEST_VALUE);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(TEST_INDEX >> 8);
        expect(cpu.getRegisterEValue()).toBe(TEST_INDEX & 0x00FF);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(TEST_INDEX);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(TEST_VALUE << 8);
        expect(cpu.getProgramCounter()).toBe(1);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    });
})