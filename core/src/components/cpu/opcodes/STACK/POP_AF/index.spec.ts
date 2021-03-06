import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("POP_AF", () => {
    test("Should store stack values in A and F registers, increase SP Register by 2, increase PC by 1", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const SP_INDEX = 50000;
        const EXPECTED_SP_INDEX = SP_INDEX + 2;
        const REG_A_VALUE = 10;
        const REG_F_VALUE = 0b11110000;
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
        memory.directWrite8BitsValue(SP_INDEX, REG_F_VALUE);
        memory.directWrite8BitsValue(SP_INDEX + 1, REG_A_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(REG_A_VALUE);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(REG_F_VALUE);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(REG_A_VALUE << 8 | REG_F_VALUE);
        expect(cpu.getRegisterSPValue()).toBe(EXPECTED_SP_INDEX);
        expect(cpu.getProgramCounter()).toBe(1);
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
    });

});