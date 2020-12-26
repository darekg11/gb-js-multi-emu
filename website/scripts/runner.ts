import GameboyEmulator from "gb-js-multi-emu-core";
import Cartridge from "gb-js-multi-emu-core/dist/components/cartridge";
import { DefaultEmulatorSettings } from "gb-js-multi-emu-core/dist/types";
import { LCD_WIDTH, LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";

class Runner {
    gameboy = null;
    scaleFactor = 1;

    constructor () {
        this.gameboy = new GameboyEmulator(new DefaultEmulatorSettings(), (pixelBuffer) => {
            const canvas = document.getElementById("emulator_window") as HTMLCanvasElement;
            const canvasContext = canvas.getContext("2d");
            const scaledImageData = canvasContext.createImageData(LCD_WIDTH * this.scaleFactor, LCD_HEIGHT * this.scaleFactor);
            const subLine = canvasContext.createImageData(this.scaleFactor, 1).data;

            for (let row = 0; row < LCD_HEIGHT; row++) {
                for (let column = 0; column < LCD_WIDTH; column++) {
                    const pixelStartIndex = (row * LCD_WIDTH + column) * 4;
                    const pixelEndIndex = (row * LCD_WIDTH + column) * 4 + 4;
                    const originalPixelRGBA = pixelBuffer.subarray(pixelStartIndex, pixelEndIndex);
                    for (let x = 0; x < this.scaleFactor; x++) {
                        subLine.set(originalPixelRGBA, x * 4);
                    }
                    for (let y = 0; y < this.scaleFactor; y++) {
                        const destinationRow = row * this.scaleFactor + y;
                        const destinationColumn = column * this.scaleFactor;
                        scaledImageData.data.set(subLine, (destinationRow * LCD_WIDTH * this.scaleFactor + destinationColumn) * 4);
                    }
                }
            }
            canvasContext.putImageData(scaledImageData, 0, 0);
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

    public changeScaleFactor(newScaleFactor) {
        let safeScaleFactor = 1;
        if (newScaleFactor < 1 || newScaleFactor > 5) {
            safeScaleFactor = 1;
        }
        safeScaleFactor = Math.min(newScaleFactor, 5);
        this.scaleFactor = safeScaleFactor;
    }
}

window.globalThis.runner = new Runner();