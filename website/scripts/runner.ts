import GameboyEmulator from "gb-js-multi-emu-core";
import Cartridge from "gb-js-multi-emu-core/dist/components/cartridge";
import { DefaultEmulatorSettings } from "gb-js-multi-emu-core/dist/types";

class Runner {
    gameboy = null;

    constructor () {
        this.gameboy = new GameboyEmulator(new DefaultEmulatorSettings(), (pixelBuffer) => {
            const canvas = document.getElementById("emulator_window") as HTMLCanvasElement;
            const canvasContext = canvas.getContext("2d");
            const imageData = canvasContext.createImageData(160, 144);
            for (let cnt = 0; cnt < imageData.data.length; cnt++) {
                imageData.data[cnt] = pixelBuffer[cnt];
            }
            canvasContext.putImageData(imageData, 0, 0);
        });
    }

    public tick() {
        this.gameboy.runSingleTick();
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

    public runSingleFrame() {
        this.gameboy.runSingleFrame();
    }
}

window.globalThis.runner = new Runner();