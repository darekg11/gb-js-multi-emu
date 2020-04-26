import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("SCF", () => {
    test("Should unset half carry flag, substraction flag, set carry flag and do not affect zero flag and increase PC by 1", () => {
        const cpu = new CPU();
        const memory = new Memory();
        const EXPECTED_F_REG_VALUE = 0b10010000;

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

        cpu.setZeroFlag();
        cpu.setHalfCarryFlag();
        cpu.setSubtractionFlag();
        cpu.unsetCarryFlag();

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
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
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(true);
    });
})