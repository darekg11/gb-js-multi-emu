import CPU from "./cpu";

describe("CPU - Registers - Sets and Gets", () => {
    test("Register A", () => {
        const cpu = new CPU();
        cpu.setRegisterAValue(59);
        expect(cpu.getRegisterAValue()).toBe(59);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register B", () => {
        const cpu = new CPU();
        cpu.setRegisterBValue(76);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(76);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register C", () => {
        const cpu = new CPU();
        cpu.setRegisterCValue(206);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(206);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register D", () => {
        const cpu = new CPU();
        cpu.setRegisterDValue(44);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(44);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register E", () => {
        const cpu = new CPU();
        cpu.setRegisterEValue(88);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(88);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register F", () => {
        const cpu = new CPU();
        cpu.setRegisterFValue(99);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(99);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register H", () => {
        const cpu = new CPU();
        cpu.setRegisterHValue(134);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(134);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register L", () => {
        const cpu = new CPU();
        cpu.setRegisterLValue(201);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(201);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register AF", () => {
        const cpu = new CPU();
        cpu.setRegisterAFValue(45907);
        expect(cpu.getRegisterAValue()).toBe(179);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(83);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(45907);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register BC", () => {
        const cpu = new CPU();
        cpu.setRegisterBCValue(45907);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(179);
        expect(cpu.getRegisterCValue()).toBe(83);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterBCValue()).toBe(45907);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register DE", () => {
        const cpu = new CPU();
        cpu.setRegisterDEValue(45907);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(179);
        expect(cpu.getRegisterEValue()).toBe(83);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(45907);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterHLValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register HL", () => {
        const cpu = new CPU();
        cpu.setRegisterHLValue(45907);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(179);
        expect(cpu.getRegisterLValue()).toBe(83);
        expect(cpu.getRegisterHLValue()).toBe(45907);
        expect(cpu.getRegisterBCValue()).toBe(0);
        expect(cpu.getRegisterDEValue()).toBe(0);
        expect(cpu.getRegisterAFValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(0);
    });
    test("Register SP", () => {
        const cpu = new CPU();
        cpu.setRegisterSPValue(55021);
        expect(cpu.getRegisterAValue()).toBe(0);
        expect(cpu.getRegisterBValue()).toBe(0);
        expect(cpu.getRegisterCValue()).toBe(0);
        expect(cpu.getRegisterDValue()).toBe(0);
        expect(cpu.getRegisterEValue()).toBe(0);
        expect(cpu.getRegisterFValue()).toBe(0);
        expect(cpu.getRegisterHValue()).toBe(0);
        expect(cpu.getRegisterLValue()).toBe(0);
        expect(cpu.getRegisterSPValue()).toBe(55021);
    });
})

describe("Program Counter - Increase and Get", () => {
    test("Should correctly increase and get value of PC", () => {
        const cpu = new CPU();
        expect(cpu.getProgramCounter()).toBe(0);
        cpu.increaseProgramCounter(10);
        expect(cpu.getProgramCounter()).toBe(10);
        cpu.increaseProgramCounter(2);
        expect(cpu.getProgramCounter()).toBe(12);
    })
});

describe("Interrupts - Enable / Disable / Get", () => {
    test("Should correctly return state of interrupts", () => {
        const cpu = new CPU();
        expect(cpu.areInterruptsEnabled()).toBe(true);
    });
    test("Should disable interrupts", () => {
        const cpu = new CPU();
        cpu.disableInterrupts();
        expect(cpu.areInterruptsEnabled()).toBe(false);
    });
    test("Should enable interrupts", () => {
        const cpu = new CPU();
        cpu.disableInterrupts();
        expect(cpu.areInterruptsEnabled()).toBe(false);
        cpu.enableInterrupts();
        expect(cpu.areInterruptsEnabled()).toBe(true);
    });
});

describe("Zero Flag - Statuses", () => {
    test("isZeroFlagSet - return true when flag is indeed set", () => {
        const F_REGISTER_VALUE = 0b10000000;
        const cpu = new CPU();
        expect(cpu.isZeroFlagSet()).toBe(false);
        cpu.setRegisterFValue(F_REGISTER_VALUE);
        expect(cpu.isZeroFlagSet()).toBe(true);
    });

    test("setZeroFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b10000000;
        const cpu = new CPU();
        expect(cpu.isZeroFlagSet()).toBe(false);
        cpu.setZeroFlag();
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
    });

    test("unsetZeroFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b10000000;
        const cpu = new CPU();
        expect(cpu.isZeroFlagSet()).toBe(false);
        cpu.setZeroFlag();
        expect(cpu.isZeroFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
        cpu.unsetZeroFlag();
        expect(cpu.isZeroFlagSet());
        expect(cpu.getRegisterFValue()).toBe(0);
    });
});

describe("Subtraction Flag - Statuses", () => {
    test("isSubtractionFlagSet - return true when flag is indeed set", () => {
        const F_REGISTER_VALUE = 0b01000000;
        const cpu = new CPU();
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        cpu.setRegisterFValue(F_REGISTER_VALUE);
        expect(cpu.isSubtractionFlagSet()).toBe(true);
    });

    test("setSubtractionFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b01000000;
        const cpu = new CPU();
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        cpu.setSubtractionFlag();
        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
    });

    test("unsetSubtractionFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b01000000;
        const cpu = new CPU();
        expect(cpu.isSubtractionFlagSet()).toBe(false);
        cpu.setSubtractionFlag();
        expect(cpu.isSubtractionFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
        cpu.unsetSubtractionFlag();
        expect(cpu.isSubtractionFlagSet());
        expect(cpu.getRegisterFValue()).toBe(0);
    });
});

describe("Half Carry Flag - Statuses", () => {
    test("isHalfCarryFlagSet - return true when flag is indeed set", () => {
        const F_REGISTER_VALUE = 0b00100000;
        const cpu = new CPU();
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        cpu.setRegisterFValue(F_REGISTER_VALUE);
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
    });

    test("setHalfCarryFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b00100000;
        const cpu = new CPU();
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        cpu.setHalfCarryFlag();
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
    });

    test("unsetHalfCarryFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b00100000;
        const cpu = new CPU();
        expect(cpu.isHalfCarryFlagSet()).toBe(false);
        cpu.setHalfCarryFlag();
        expect(cpu.isHalfCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
        cpu.unsetHalfCarryFlag();
        expect(cpu.isHalfCarryFlagSet());
        expect(cpu.getRegisterFValue()).toBe(0);
    });
});

describe("Carry Flag - Statuses", () => {
    test("isCarryFlagSet - return true when flag is indeed set", () => {
        const F_REGISTER_VALUE = 0b00010000;
        const cpu = new CPU();
        expect(cpu.isCarryFlagSet()).toBe(false);
        cpu.setRegisterFValue(F_REGISTER_VALUE);
        expect(cpu.isCarryFlagSet()).toBe(true);
    });

    test("setCarryFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b00010000;
        const cpu = new CPU();
        expect(cpu.isCarryFlagSet()).toBe(false);
        cpu.setCarryFlag();
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
    });

    test("unsetCarryFlag - set flag", () => {
        const F_REGISTER_VALUE = 0b00010000;
        const cpu = new CPU();
        expect(cpu.isCarryFlagSet()).toBe(false);
        cpu.setCarryFlag();
        expect(cpu.isCarryFlagSet()).toBe(true);
        expect(cpu.getRegisterFValue()).toBe(F_REGISTER_VALUE);
        cpu.unsetCarryFlag();
        expect(cpu.isCarryFlagSet());
        expect(cpu.getRegisterFValue()).toBe(0);
    });
});