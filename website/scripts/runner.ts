import GameboyEmulator from "gb-js-multi-emu-core";
import Cartridge from "gb-js-multi-emu-core/dist/components/cartridge";

class Runner {
    gameboy = null;

    constructor () {
        this.gameboy = new GameboyEmulator();
    }

    public tick() {
        this.gameboy.run();
    }

    public getCPUDebugInfo() {
        return this.gameboy.getCPUDebugInfo();
    }

    public getROMDebugInfo() {
        return this.gameboy.getROMDebugInfo();
    }

    public getMemoryValue = (address: number) => {
        return this.gameboy.getMemoryValue(address);
    }

    public loadRom = (rawBinaryData: Uint8Array) => {
        this.gameboy.loadCartridge(new Cartridge(rawBinaryData));
    }
}

window.globalThis.runner = new Runner();