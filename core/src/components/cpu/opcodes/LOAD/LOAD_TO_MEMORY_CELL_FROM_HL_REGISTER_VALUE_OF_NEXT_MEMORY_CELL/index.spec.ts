import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_NEXT_MEMORY_CELL", () => {
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

        memory.write8BitsValue(1, TEST_VALUE);
        cpu.setRegisterHLValue(TEST_INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(TEST_INDEX >> 8);
        expect(cpu.getRegisterLValue()).toBe(TEST_INDEX & 0x00FF);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(TEST_INDEX);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(2);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    });
})