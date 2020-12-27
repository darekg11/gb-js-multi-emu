import handle from "./index";
import CPU from "../../../cpu";
import Memory from "../../../../memory/memory";
import EventBus from "../../../../event-bus";

describe("LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_A_REGISTER", () => {
    test("Should set value correctly and increase PC by 3", () => {
        const TEST_VALUE = 198;
        const TEST_INDEX = 0xABE1;
        const cpu = new CPU();
        const memory = new Memory(new EventBus);
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
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(0);

        memory.directWrite8BitsValue(1, 0xE1);
        memory.directWrite8BitsValue(2, 0xAB);
        cpu.setRegisterAValue(TEST_VALUE);

        handle({ CPU: cpu, Memory: memory });

        expect(cpu.getRegisterAValue()).toBe(TEST_VALUE);
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
        expect(cpu.getRegisterAFValue()).toBe(TEST_VALUE << 8);
        expect(cpu.getProgramCounter()).toBe(3);
        expect(memory.read8BitsValue(TEST_INDEX)).toBe(TEST_VALUE);
    });
})