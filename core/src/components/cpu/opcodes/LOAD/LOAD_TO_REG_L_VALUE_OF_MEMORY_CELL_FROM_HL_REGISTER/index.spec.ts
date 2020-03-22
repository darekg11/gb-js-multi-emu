import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("LOAD_TO_REG_L_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER", () => {
    test("Should set value correctly and increase PC by 1", () => {
        const TEST_VALUE = 198;
        const TEST_INDEX = 44001;
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

        memory.write8BitsValue(TEST_INDEX, TEST_VALUE);
        cpu.setRegisterHLValue(TEST_INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(TEST_INDEX >> 8);
        expect(cpu.getRegisterLValue()).toBe(TEST_VALUE);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe((TEST_INDEX >> 8 << 8) | TEST_VALUE);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(1);
    });
})