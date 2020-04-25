import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("DEC DE", () => {
    test("Should decrease DE register value and do not change flag state", () => {
        const cpu = new CPU();
        const memory = new Memory();
        const REG_D = 10;
        const REG_E = 20;
        const EXPECTED_DE_VALUE =  REG_D << 8 | REG_E;
        const EXPECTED_F_REG_VALUE = 0b11110000
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

        cpu.setRegisterDValue(REG_D);
        cpu.setRegisterEValue(REG_E);
        cpu.setSubtractionFlag();
        cpu.setCarryFlag();
        cpu.setHalfCarryFlag();
        cpu.setZeroFlag();

        expect(cpu.getRegisterDEValue()).toBe(EXPECTED_DE_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(REG_D);
        expect(cpu.getRegisterEValue()).toBe(REG_E - 1);
        expect(cpu.getRegisterFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(EXPECTED_DE_VALUE - 1);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(EXPECTED_F_REG_VALUE);
        expect(cpu.getProgramCounter()).toBe(1);
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
    });
})