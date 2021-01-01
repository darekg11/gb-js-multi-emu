import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("ADC_TO_REG_A_VALUE_OF_REG_A", () => {
    test("Result above 255 should set carry flag - carry flag NOT set before", () => {
    });

    test("Result above 255 should set carry flag - carry flag SET before", () => {
    });

    test("Result below 0 should set carry flag - carry flag NOT set before", () => {
    });

    test("Result below 0 should set carry flag - carry flag SET before", () => {
    });

    test("Result between 0 and 255 should not set carry flag - carry flag NOT set before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = 10;
        const RESULT = 20;
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
    
        cpu.setRegisterAValue(REG_A);

        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result between 0 and 255 should not set carry flag - carry flag SET before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = 10;
        const RESULT = 20 + 1; // +1 from carry
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
    
        cpu.setCarryFlag();
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isCarryFlagSet()).toBe(false);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result 0 should set zero flag - carry flag NOT set before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = 0;
        const RESULT = 0;
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
    
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result above 0 should not set zero flag - carry flag NOT set before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = 10;
        const RESULT = 20;
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
    
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result above 0 should not set zero flag - carry flag SET before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = 20;
        const RESULT = 40 + 1; // +1 comes from carry
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
    
        cpu.setCarryFlag();
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isZeroFlagSet()).toBe(false);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result of 17 should set half carry flag - carry flag NOT set before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = -17;
        const RESULT = 222;
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
    
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("Result of 17 should set half carry flag - carry flag SET before", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = -17;
        const RESULT = 222 + 1; // +1 comes from carry
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
    
        cpu.setCarryFlag();
        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });
    
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterAValue()).toBe(RESULT);
    });

    test("PC should be increased by 1", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = -17;
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

        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getProgramCounter()).toBe(1);
    });

    test("Subtraction flag should NOT be set", () => {
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
        const REG_A = -17;
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

        cpu.setRegisterAValue(REG_A);
    
        handle({ CPU: cpu, Memory: memory });

        expect(cpu.isSubtractionFlagSet()).toBe(false);
    });
})