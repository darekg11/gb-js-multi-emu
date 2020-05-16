import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("RLCL", () => {
    test("Should rotate register L value to the left by 1 bit. Should set carry flag if bit 7 of register L is set. Carry flag set", () => {
        const REG_L_VALUE = 130;
        // << 1 + 1 from carry flag in bit 0 & 255
        const EXPETCTED_REG_L_VALUE = 5;
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

        cpu.setRegisterLValue(REG_L_VALUE);
        cpu.setZeroFlag();
        cpu.setCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE );
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(true);
    });

    test("Should rotate register L value to the left by 1 bit. Should unset carry flag if bit 7 of register L is not set. Unset carry flag set", () => {
        const REG_L_VALUE = 32;
        // << 1 + 0 from carry flag in bit 0 & 255
        const EXPETCTED_REG_L_VALUE = 64;
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

        cpu.setRegisterLValue(REG_L_VALUE);
        cpu.unsetCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
    });

    test("Should rotate register L value to the left by 1 bit. Should unset Zero Flag is result is not 0", () => {
        const REG_L_VALUE = 32;
        const EXPETCTED_REG_L_VALUE = 64;
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

        cpu.setRegisterLValue(REG_L_VALUE);
        cpu.setZeroFlag();
        cpu.setCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(EXPETCTED_REG_L_VALUE);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE );
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
    });

})