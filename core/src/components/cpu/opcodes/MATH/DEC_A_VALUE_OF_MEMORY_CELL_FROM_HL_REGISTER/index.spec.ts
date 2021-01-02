import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("DEC_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER", () => {
    test("Result 0 should set zero flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const VALUE = 1;
        const INDEX = 40234;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });

    test("Result above 0 should not set zero flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const INDEX = 40234;
        const VALUE = 2;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });

    test("Result of 15 should set half carry flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const INDEX = 40234;
        const VALUE = 16;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });

    test("Result other than 15 should NOT set half carry flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const INDEX = 40234;
        const VALUE = 20;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });

    test("PC should be increased by 1", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const INDEX = 40234;
        const VALUE = 20;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getProgramCounter()).toBe(1);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });

    test("Subtraction flag should be set", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const INDEX = 40234;
        const VALUE = 20;
        const RESULT = VALUE - 1;

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

        memory.write8BitsValue(INDEX, VALUE);
        cpu.setRegisterHLValue(INDEX);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(memory.read8BitsValue(INDEX)).toBe(RESULT);
    });
})