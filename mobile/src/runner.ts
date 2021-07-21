import GameboyEmulator from "gb-js-multi-emu-core";
import Cartridge from "gb-js-multi-emu-core/dist/components/cartridge";
import { DefaultEmulatorSettings } from "gb-js-multi-emu-core/dist/types";
import { LCD_WIDTH, LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { BUTTONS } from "gb-js-multi-emu-core/dist/components/joypad/types";

class Runner {
    canvas: HTMLCanvasElement | null = null;

    private drawFrameCallbackHandler = (pixelBuffer: Uint8ClampedArray) => {
        if (!this.canvas) {
            this.canvas = document.getElementById("emulator_window") as HTMLCanvasElement;
        }
        const canvasContext = this.canvas.getContext("2d");
        if (!canvasContext) {
            return;
        }
        const scaledImageData = canvasContext.createImageData(LCD_WIDTH * this.scaleFactor, LCD_HEIGHT * this.scaleFactor);
        const subLine = canvasContext.createImageData(this.scaleFactor, 1).data;

        for (let row = 0; row < LCD_HEIGHT; row++) {
            for (let column = 0; column < LCD_WIDTH; column++) {
                for (let x = 0; x < this.scaleFactor; x++) {
                    const originX = x * 4;
                    subLine[originX] = pixelBuffer[(row * LCD_WIDTH + column) * 4];
                    subLine[originX + 1] = pixelBuffer[(row * LCD_WIDTH + column) * 4 + 1];
                    subLine[originX + 2] = pixelBuffer[(row * LCD_WIDTH + column) * 4 + 2];
                    subLine[originX + 3] = pixelBuffer[(row * LCD_WIDTH + column) * 4 + 3];
                }
                for (let y = 0; y < this.scaleFactor; y++) {
                    const destinationRow = row * this.scaleFactor + y;
                    const destinationColumn = column * this.scaleFactor;
                    scaledImageData.data.set(subLine, (destinationRow * LCD_WIDTH * this.scaleFactor + destinationColumn) * 4);
                }
            }
        }
        canvasContext.putImageData(scaledImageData, 0, 0);
    }

    gameboy: GameboyEmulator = new GameboyEmulator(new DefaultEmulatorSettings(), this.drawFrameCallbackHandler);
    scaleFactor = 1;
    romData = new Uint8Array();
    refreshTimeoutInstance: NodeJS.Timeout | null = null;
    fpsInterval = 1000 / 60;

    private run = () => {
        this.refreshTimeoutInstance = setTimeout(this.run, this.fpsInterval);
        this.runSingleFrame();
    }

    public resetRom = () => {
        if (this.romData.length === 0) {
            return;
        }
        if (this.refreshTimeoutInstance) {
            clearTimeout(this.refreshTimeoutInstance);
        }
        this.gameboy.reset();
        this.gameboy.loadCartridge(new Cartridge(this.romData));
        this.run();
    }

    public loadRom = (rawBinaryData: Uint8Array) => {
        if (this.refreshTimeoutInstance) {
            clearTimeout(this.refreshTimeoutInstance);
        }
        this.romData = rawBinaryData;
        this.gameboy.reset();
        this.gameboy.loadCartridge(new Cartridge(this.romData));
        this.run();
    }

    public getRomName = () => {
        return this.gameboy.getROMDebugInfo().NAME;
    }

    public runSingleFrame = () => {
        this.gameboy.runSingleFrame();
    }

    public changeScaleFactor = (newScaleFactor: number) => {
        let safeScaleFactor = 1;
        if (newScaleFactor < 1 || newScaleFactor > 5) {
            safeScaleFactor = 1;
        }
        safeScaleFactor = Math.min(newScaleFactor, 5);
        this.scaleFactor = safeScaleFactor;
    }

    public buttonPressed = (button: BUTTONS) => {
        this.gameboy.buttonPressed(button);
    }

    public buttonReleased = (button: BUTTONS) => {
        this.gameboy.buttonReleased(button);
    }
}

export default Runner;