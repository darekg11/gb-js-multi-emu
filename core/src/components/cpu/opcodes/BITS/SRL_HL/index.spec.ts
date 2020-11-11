import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("SRL_HL", () => {
    test("Should rotate value under memory index from register HL to the right by 1 bit. Should set carry flag if bit 0 of value under memory index from register HL is set. Should unset zero flag if result is not zero.", () => {
        const MEMORY_INDEX = 40765;
        const MEMORY_VALUE = 33;
        const EXPETCTED_MEMORY_VALUE = 16;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
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

        cpu.setZeroFlag();
        memory.write8BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.setRegisterHLValue(MEMORY_INDEX);

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
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(memory.read8BitsValue(MEMORY_INDEX)).toBe(EXPETCTED_MEMORY_VALUE);
    });

    test("Should rotate value under memory index from register HL to the right by 1 bit. Should unset carry flag bit 0 of value under memory index from register HL is not set.", () => {
        const MEMORY_INDEX = 40765;
        const MEMORY_VALUE = 32;
        const EXPETCTED_MEMORY_VALUE = 16;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
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

        cpu.setZeroFlag();
        memory.write8BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.setRegisterHLValue(MEMORY_INDEX);
        cpu.setCarryFlag();

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
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(MEMORY_INDEX)).toBe(EXPETCTED_MEMORY_VALUE);
    });

    test("Should rotate value under memory index from register HL to the right by 1 bit. Should unset carry flag if bit 0 of value under memory index from register HL is not set. Should set zero flag if result is zero.", () => {
        const MEMORY_INDEX = 40765;
        const MEMORY_VALUE = 0;
        const EXPETCTED_MEMORY_VALUE = 0;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
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

        memory.write8BitsValue(MEMORY_INDEX, MEMORY_VALUE);
        cpu.setRegisterHLValue(MEMORY_INDEX);
        cpu.setCarryFlag();

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
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(MEMORY_INDEX)).toBe(EXPETCTED_MEMORY_VALUE);
    });
})