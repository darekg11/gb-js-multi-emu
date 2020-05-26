import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("RST_38", () => {
    test("Should CALL 0x38 Address", () => {
        const cpu = new CPU();
        const memory = new Memory();
        const PC = 56789;
        const SP = 100;
        const CALL_VALUE = 120;
        const EXPECTED_PC = 0x38;
        const EXPECTED_SP = SP - 2;
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

        cpu.jump(PC);
        cpu.setRegisterSPValue(SP);
        memory.write16BitsValue(PC + 1, CALL_VALUE);

        handle({ CPU: cpu, Memory: memory });

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
        expect(cpu.getProgramCounter()).toBe(EXPECTED_PC);
        expect(cpu.getRegisterSPValue()).toBe(EXPECTED_SP);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(cpu.getRegisterSPValue())).toBe(PC >> 8);
        expect(memory.read8BitsValue(cpu.getRegisterSPValue() + 1)).toBe(PC & 0xFF);
        expect(memory.read16BitsValue(cpu.getRegisterSPValue())).toBe(PC);
    });
})