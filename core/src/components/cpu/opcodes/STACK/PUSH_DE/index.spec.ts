import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("PUSH_DE", () => {
    test("Should store D and E registers on stack, decreases SP Register by 2, increase PC by 1", () => {
        const cpu = new CPU();
        const memory = new Memory();
        const SP_INDEX = 20981;
        const EXPECTED_SP_INDEX = SP_INDEX - 2;
        const REG_D_VALUE = 10;
        const REG_E_VALUE = 22;
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

        cpu.setRegisterSPValue(SP_INDEX)
        cpu.setRegisterDValue(REG_D_VALUE);
        cpu.setRegisterEValue(REG_E_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(REG_D_VALUE);
        expect(cpu.getRegisterEValue()).toBe(REG_E_VALUE);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(REG_D_VALUE << 8 | REG_E_VALUE);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(EXPECTED_SP_INDEX);
        expect(cpu.getProgramCounter()).toBe(1);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(SP_INDEX - 1)).toBe(REG_D_VALUE);
        expect(memory.read8BitsValue(SP_INDEX - 2)).toBe(REG_E_VALUE);
    });

});