import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("RETURN_IF_ZERO_FLAG_IS_SET", () => {
    test("Should RETURN if zero flag is set", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const PC = 56789;
        const SP = 50000;
        const RETURN_VALUE = 56789;
        const EXPECTED_SP = SP + 2;
        const EXPECTED_F_REG_VALUE = 0b10000000;
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
        cpu.jump(PC);
        cpu.setRegisterSPValue(SP);
        memory.write16BitsValue(SP, RETURN_VALUE);

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
        expect(cpu.getProgramCounter()).toBe(RETURN_VALUE);
        expect(cpu.getRegisterSPValue()).toBe(EXPECTED_SP);
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(SP)).toBe(RETURN_VALUE & 0xFF);
        expect(memory.read8BitsValue(SP + 1)).toBe(RETURN_VALUE >> 8);
        expect(memory.read16BitsValue(SP)).toBe(RETURN_VALUE);
    });

    test("Should NOT RETURN if zero flag is NOT set", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const PC = 56789;
        const SP = 50000;
        const RETURN_VALUE = 56789;
        const EXPECTED_PC = PC + 1;
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

        cpu.unsetZeroFlag();
        cpu.jump(PC);
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
        expect(cpu.getProgramCounter()).toBe(EXPECTED_PC);
        expect(cpu.getRegisterSPValue()).toBe(SP);
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
    });
})