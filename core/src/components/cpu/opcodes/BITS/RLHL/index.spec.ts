import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("RLHL", () => {
    test("Should rotate value from index under register HL value to the left by 1 bit. Should set carry flag if bit 7 of value under HL index is set. Carry flag set", () => {
        const MEMORY_VALUE = 130;
        const MEMORY_INDEX = 43987;
        // << 1 + 1 from carry flag in bit 0 & 255
        const EXPECTED_MEMORY_VALUE = 5;
        const cpu = new CPU();
        const memory = new Memory();
        const EXPECTED_F_REG_VALUE = 0b00010000;
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

        cpu.setRegisterHLValue(MEMORY_INDEX);
        memory.write16BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.setZeroFlag();
        cpu.setCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(MEMORY_INDEX >> 8);
        expect(cpu.getRegisterLValue()).toBe(MEMORY_INDEX & 0x00FF);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(MEMORY_INDEX);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(memory.read16BitsValue(MEMORY_INDEX)).toBe(EXPECTED_MEMORY_VALUE);
    });

    test("Should rotate value from memory under register HL index to the left by 1 bit. Should unset carry flag if bit 7 of value from memory under register HL index is not set. Unset carry flag set", () => {
        const MEMORY_VALUE = 32;
        const MEMORY_INDEX = 43987;
        // << 1 + 0 from carry flag in bit 0 & 255
        const EXPECTED_MEMORY_VALUE = 64;
        const cpu = new CPU();
        const memory = new Memory();
        const EXPECTED_F_REG_VALUE = 0b00000000;
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

        cpu.setRegisterHLValue(MEMORY_INDEX);
        memory.write16BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.unsetCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(MEMORY_INDEX >> 8);
        expect(cpu.getRegisterLValue()).toBe(MEMORY_INDEX & 0x00FF);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(MEMORY_INDEX);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(memory.read16BitsValue(MEMORY_INDEX)).toBe(EXPECTED_MEMORY_VALUE);
    });

    test("Should rotate value from memory under register HL index value to the left by 1 bit. Should unset Zero Flag is result is not 0", () => {
        const MEMORY_VALUE = 32;
        const MEMORY_INDEX = 43987;
        const EXPECTED_MEMORY_VALUE = 64;
        const cpu = new CPU();
        const memory = new Memory();
        const EXPECTED_F_REG_VALUE = 0b00000000;
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

        cpu.setRegisterHLValue(MEMORY_INDEX);
        memory.write16BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.setZeroFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(MEMORY_INDEX >> 8);
        expect(cpu.getRegisterLValue()).toBe(MEMORY_INDEX & 0x00FF);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(MEMORY_INDEX);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE );
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(memory.read16BitsValue(MEMORY_INDEX)).toBe(EXPECTED_MEMORY_VALUE);
    });

})