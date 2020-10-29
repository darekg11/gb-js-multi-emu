import GameboyEmulator from "gb-js-multi-emu-core";

class Runner {
    gameboy = null;

    constructor () {
        this.gameboy = new GameboyEmulator();
    }

    public tick() {
        this.gameboy.run();
    }

    public getDebugInfo() {
        return this.gameboy.getDebugInfo();
    }

    public getMemoryValue = (address: number) => {
        return this.gameboy.getMemoryValue(address);
    }
}

window.globalThis.runner = new Runner();