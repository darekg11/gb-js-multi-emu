import _ from "lodash";
import Cartridge from "./components/cartridge";
import GameboyEmulator from "./GameboyEmulator";

describe("initialize", () => {
    test("should create new instance of emulator without crashing", () => {
        const emulator = new GameboyEmulator();
        expect(emulator).toBeDefined();
    });
});

describe("debug infos", () => {
    test("should return correct CPU Debug Info", () => {
        const emulator = new GameboyEmulator();
        const startDebugInfo = emulator.getCPUDebugInfo();
        expect(startDebugInfo.A).toBe(0);
        expect(startDebugInfo.B).toBe(0);
        expect(startDebugInfo.C).toBe(0);
        expect(startDebugInfo.D).toBe(0);
        expect(startDebugInfo.E).toBe(0);
        expect(startDebugInfo.F).toBe(0);
        expect(startDebugInfo.H).toBe(0);
        expect(startDebugInfo.L).toBe(0);
        expect(startDebugInfo.HL).toBe(0);
        expect(startDebugInfo.DE).toBe(0);
        expect(startDebugInfo.BC).toBe(0);
        expect(startDebugInfo.SP).toBe(0);
        expect(startDebugInfo.PC).toBe(0);
        expect(startDebugInfo.ZERO_FLAG).toBeFalsy();
        expect(startDebugInfo.HALF_CARRY_FLAG).toBeFalsy();
        expect(startDebugInfo.CARRY_FLAG).toBeFalsy();
        expect(startDebugInfo.SUBTRACTION_FLAG).toBeFalsy();

        // run emulator - this will run BIOS actually...
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();
        emulator.run();

        const endDebugInfo = emulator.getCPUDebugInfo();
        expect(endDebugInfo.A).toBe(0);
        expect(endDebugInfo.B).toBe(0);
        expect(endDebugInfo.C).toBe(0);
        expect(endDebugInfo.D).toBe(0);
        expect(endDebugInfo.E).toBe(0);
        expect(endDebugInfo.F).toBe(0x20);
        expect(endDebugInfo.H).toBe(0x9F);
        expect(endDebugInfo.L).toBe(0xFC);
        expect(endDebugInfo.HL).toBe(0x9FFC);
        expect(endDebugInfo.DE).toBe(0x0);
        expect(endDebugInfo.BC).toBe(0x0);
        expect(endDebugInfo.SP).toBe(0xFFFE);
        expect(endDebugInfo.PC).toBe(0xA);
        expect(endDebugInfo.ZERO_FLAG).toBeFalsy();
        expect(endDebugInfo.HALF_CARRY_FLAG).toBeTruthy();
        expect(endDebugInfo.CARRY_FLAG).toBeFalsy();
        expect(endDebugInfo.SUBTRACTION_FLAG).toBeFalsy();
    });

    test("should return correct ROM Debug Info", () => {
        const EXAMPLE_PROGRAM = _.range(0x134);
        EXAMPLE_PROGRAM.push(...[
            0x54, 0x45, 0x54, 0x52, 0x49, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));

        const TEST_ROM = new Cartridge(EXAMPLE_PROGRAM);
        const emulator = new GameboyEmulator();
        
        emulator.loadCartridge(TEST_ROM);

        const debugInfo = emulator.getROMDebugInfo();
        expect(debugInfo.NAME).toBe("TETRIS");
        expect(debugInfo.IS_COLOR).toBeFalsy();
        expect(debugInfo.IS_SUPER).toBeFalsy();
        expect(debugInfo.MANUFACTURER).toBe("");
        expect(debugInfo.TYPE).toBe(0);

    });

    test("should return correct memory value", () => {
        const emulator = new GameboyEmulator();

        expect(emulator.getMemoryValue(0xFF)).toBe(0x50);
    })
});

describe("unmap BIOS flow", () => {
    const emulator = new GameboyEmulator({ load_bios: false });
    const UNMAP_BIOS_PROGRAM = [
        0x3E, // LD A, 0x01
        0x01,
        0xE0, // LDH 0x50 1 = LD 0xFF50, 1. Writing non zero value to register 0xFF50 unmaps BIOS from memory and making it all for actual ROM
        0x50,
    ];
    UNMAP_BIOS_PROGRAM.push(..._.range(0x140));
    UNMAP_BIOS_PROGRAM.push(0x00);
    UNMAP_BIOS_PROGRAM.push(..._.range(0x400));

    emulator.loadCartridge(new Cartridge(UNMAP_BIOS_PROGRAM));
    emulator.run();
    emulator.run();

    expect(emulator.getMemoryValue(0)).toBe(0x3E);
    expect(emulator.getMemoryValue(1)).toBe(0x01);
    expect(emulator.getMemoryValue(2)).toBe(0xE0);
    expect(emulator.getMemoryValue(3)).toBe(0x50);
});