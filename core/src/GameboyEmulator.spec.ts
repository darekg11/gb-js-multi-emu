import GameboyEmulator from "./GameboyEmulator";

describe("initialize", () => {
    test("should create new instance of emulator without crashing", () => {
        const emulator = new GameboyEmulator();
        expect(emulator).toBeDefined();
    });
})