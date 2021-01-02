import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("DEC_C", () => {
    test("Result 0 should set zero flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 1;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.getRegisterBValue()).toBe(RESULT);
    });

    test("Result above 0 should not set zero flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 2;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.getRegisterCValue()).toBe(RESULT);
    });

    test("Result of 15 should set half carry flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 16;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterCValue()).toBe(RESULT);
    });

    test("Result other than 15 should NOT set half carry flag", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 20;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        expect(cpu.getRegisterCValue()).toBe(RESULT);
    });

    test("PC should be increased by 1", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 20;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getProgramCounter()).toBe(1);
        expect(cpu.getRegisterCValue()).toBe(RESULT);
    });

    test("Subtraction flag should be set", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_C = 20;
        const RESULT = REG_C - 1;

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

        cpu.setRegisterCValue(REG_C);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.getRegisterCValue()).toBe(RESULT);
    });
})