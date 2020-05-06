import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";

describe("RETURN_AND_ENABLE_INTERRUPTS", () => {
    test("Should RETURN and enable interrupts", () => {
        const cpu = new CPU();
        const memory = new Memory();
        const PC = 56789;
        const SP = 100;
        const RETURN_VALUE = 56789;
        const EXPECTED_SP = SP + 2;
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
        cpu.disableInterrupts();
        cpu.setRegisterSPValue(SP);
        memory.write16BitsValue(SP, RETURN_VALUE);

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
        expect(cpu.getProgramCounter()).toBe(RETURN_VALUE);
        expect(cpu.getRegisterSPValue()).toBe(EXPECTED_SP);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.areInterruptsEnabled()).toBe(true);
        expect(memory.read8BitsValue(SP)).toBe(RETURN_VALUE >> 8);
        expect(memory.read8BitsValue(SP + 1)).toBe(RETURN_VALUE & 0xFF);
        expect(memory.read16BitsValue(SP)).toBe(RETURN_VALUE);
    });
})