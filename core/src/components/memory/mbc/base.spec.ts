import MemoryOutOfBoundError from "../../../errors/MemoryOutOfBoundError";
import RAMBankOutOfBoundError from "../../../errors/RAMBankOutOfBoundError";
import ROMBankOutOfBoundError from "../../../errors/ROMBankOutOfBoundError";
import MBC0 from "./MBC0";

describe("changeROMBank + getROMBank", () => {
    test("should set ROM Bank and return it correctly", () => {
        const MBC = new MBC0(4, 1024, new Uint8Array());

        expect(MBC.getROMBank()).toBe(1);

        MBC.changeROMBank(3);

        expect(MBC.getROMBank()).toBe(3);
    });
    test("should throw ROMBankOutOfBoundError when tryng to switch to ROM bank below 0", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(() => { MBC.changeROMBank(-1) }).toThrow(ROMBankOutOfBoundError);
    });
    test("should throw ROMBankOutOfBoundError when tryng to switch to ROM bank above available count", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(() => { MBC.changeROMBank(1) }).toThrow(ROMBankOutOfBoundError);
    });
});

describe("changeRAMMBank + getRAMBank", () => {
    test("should set RAM Bank and return it correctly", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(MBC.getRAMBank()).toBe(0);

        MBC.changeRAMBank(3);

        expect(MBC.getRAMBank()).toBe(3);
    });
    test("should throw RAMBankOutOfBoundError when tryng to switch to RAM bank below 0", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(() => { MBC.changeRAMBank(-1) }).toThrow(RAMBankOutOfBoundError);
    });
    test("should throw RAMBankOutOfBoundError when tryng to switch to RAM bank above available count (4)", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(() => { MBC.changeRAMBank(4) }).toThrow(RAMBankOutOfBoundError);
    });
});

describe("enableRAM + isRAMEnabled", () => {
    test("should enabled and disable RAM correctly", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        expect(MBC.isRAMEnabled()).toBeFalsy();

        MBC.enableRAM();

        expect(MBC.isRAMEnabled()).toBeTruthy();

        MBC.disableRAM();

        expect(MBC.isRAMEnabled()).toBeFalsy();
    });
});

describe("writeToRAM + readFromRAM", () => {
    test("should correctly read value from RAM - single RAM module", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        MBC.changeRAMBank(0);
        MBC.writeToRAM(10, 24);

        expect(MBC.readFromRAM(10)).toBe(24);
    });
    test("should correctly read value from RAM - multiple RAM modules", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        MBC.changeRAMBank(0);
        MBC.writeToRAM(10, 24);
        MBC.changeRAMBank(1);
        MBC.writeToRAM(10, 48);

        MBC.changeRAMBank(0);
        expect(MBC.readFromRAM(10)).toBe(24);
        MBC.changeRAMBank(1);
        expect(MBC.readFromRAM(10)).toBe(48);
        MBC.changeRAMBank(2);
        expect(MBC.readFromRAM(10)).toBe(0);
        MBC.changeRAMBank(3);
        expect(MBC.readFromRAM(10)).toBe(0);
    });
    test("reading when RAM is disabled should return 0", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        MBC.changeRAMBank(0);
        MBC.writeToRAM(10, 24);
        MBC.disableRAM();

        expect(MBC.readFromRAM(10)).toBe(0);
    });
    test("should throw MemoryOutOfBoundError when tryng to read from RAM index below 0", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        expect(() => { MBC.readFromRAM(-1) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when tryng to read from RAM above memory limitations", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        expect(() => { MBC.readFromRAM(9001) }).toThrow(MemoryOutOfBoundError);
    });
    test("writing when RAM is disabled should not overwrite value", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        MBC.changeRAMBank(0);
        MBC.writeToRAM(10, 24);
        MBC.disableRAM();
        MBC.writeToRAM(10, 48);
        MBC.enableRAM()

        expect(MBC.readFromRAM(10)).toBe(24);
    });
    test("should throw MemoryOutOfBoundError when tryng to write to RAM index below 0", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        expect(() => { MBC.writeToRAM(-1, 0) }).toThrow(MemoryOutOfBoundError);
    });
    test("should throw MemoryOutOfBoundError when tryng to write to RAM above memory limitations", () => {
        const MBC = new MBC0(1, 1024, new Uint8Array());

        MBC.enableRAM();
        expect(() => { MBC.writeToRAM(9001, 0) }).toThrow(MemoryOutOfBoundError);
    });
});