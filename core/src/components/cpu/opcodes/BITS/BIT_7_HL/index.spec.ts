import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("BIT_7_HL", () => {
    test("Should unset zero flag if bit 7 of value from memory under register HL is not 0. Subtraction flag should be unset, Half carry flag should be set, Carry flag unchaged.", () => {
        const MEMORY_INDEX = 40765;
        const MEMORY_VALUE = 255;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const EXPECTED_F_REG_VALUE = 0b00110000;
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
        cpu.setSubtractionFlag();
        cpu.unsetHalfCarryFlag();
        cpu.setCarryFlag();
        cpu.setRegisterHLValue(MEMORY_INDEX);
        memory.write8BitsValue(MEMORY_INDEX, MEMORY_VALUE);

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
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.isCarryFlagSet()).toBe(true);
    });

})