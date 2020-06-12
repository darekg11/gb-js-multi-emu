import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("RES_3_A", () => {
    test("Should se bit 3 of register A to 0.", () => {
        const REG_A_VALUE = 255;
        const EXPECTED_REG_A_VALUE = 247;
        const cpu = new CPU();
        const memory = new Memory();
        const EXPECTED_F_REG_VALUE = 0b11110000;
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

        cpu.setSubtractionFlag();
        cpu.setHalfCarryFlag();
        cpu.setCarryFlag();
        cpu.setZeroFlag();
        cpu.setRegisterAValue(REG_A_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(EXPECTED_REG_A_VALUE);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_REG_A_VALUE << 8 | EXPECTED_F_REG_VALUE);
        expect(cpu.getProgramCounter()).toBe(2);
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.isCarryFlagSet()).toBe(true);
    });
})