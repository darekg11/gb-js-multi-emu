import Canvas, {ImageData} from 'react-native-canvas';
import GameboyEmulator from 'gb-js-multi-emu-core';
import Cartridge from 'gb-js-multi-emu-core/dist/components/cartridge';
import {DefaultEmulatorSettings} from 'gb-js-multi-emu-core/dist/types';
import {
  LCD_WIDTH,
  LCD_HEIGHT,
} from 'gb-js-multi-emu-core/dist/components/gpu/constants';
import {BUTTONS} from 'gb-js-multi-emu-core/dist/components/joypad/types';

let runner: Runner | null = null;
let canvasInstance: Canvas | null = null;

class Runner {
  private drawFrameCallbackHandler = (pixelBuffer: Uint8ClampedArray) => {
    if (!canvasInstance) {
      return;
    }
    const canvasContext = canvasInstance.getContext('2d');
    if (!canvasContext) {
      return;
    }

    const scaledImageData = new ImageData(
      canvasInstance,
      [],
      LCD_WIDTH * this.scaleFactor,
      LCD_HEIGHT * this.scaleFactor,
    );
    const subLine = new ImageData(canvasInstance, [], 1, this.scaleFactor).data;

    for (let row = 0; row < LCD_HEIGHT; row++) {
      for (let column = 0; column < LCD_WIDTH; column++) {
        const pixelStartIndex = (row * LCD_WIDTH + column) * 4;
        const pixelEndIndex = (row * LCD_WIDTH + column) * 4 + 4;
        const originalPixelRGBA = pixelBuffer.subarray(
          pixelStartIndex,
          pixelEndIndex,
        );
        for (let x = 0; x < this.scaleFactor; x++) {
          subLine.set(originalPixelRGBA, x * 4);
        }
        for (let y = 0; y < this.scaleFactor; y++) {
          const destinationRow = row * this.scaleFactor + y;
          const destinationColumn = column * this.scaleFactor;
          scaledImageData.data.set(
            subLine,
            (destinationRow * LCD_WIDTH * this.scaleFactor +
              destinationColumn) *
              4,
          );
        }
      }
    }
    canvasContext.putImageData(scaledImageData, 0, 0);
  };

  gameboy: GameboyEmulator = new GameboyEmulator(
    new DefaultEmulatorSettings(),
    this.drawFrameCallbackHandler,
  );
  scaleFactor = 1;

  public loadRom = (rawBinaryData: Uint8Array) => {
    this.gameboy.reset();
    this.gameboy.loadCartridge(new Cartridge(rawBinaryData));
  };

  public runSingleFrame = () => {
    this.gameboy.runSingleFrame();
  };

  public changeScaleFactor = (newScaleFactor: number) => {
    let safeScaleFactor = 1;
    if (newScaleFactor < 1 || newScaleFactor > 5) {
      safeScaleFactor = 1;
    }
    safeScaleFactor = Math.min(newScaleFactor, 5);
    this.scaleFactor = safeScaleFactor;
  };

  public buttonPressed = (button: BUTTONS) => {
    this.gameboy.buttonPressed(button);
  };

  public buttonReleased = (button: BUTTONS) => {
    this.gameboy.buttonReleased(button);
  };
}

const calculateScreenFactor = (width: number) => {
  const scaleFactor = Math.floor(width / LCD_WIDTH);
  return Math.min(scaleFactor, 5);
};

const loadRom = (rawBinaryData: Uint8Array) => {
  if (runner) {
    runner = null;
  }
  runner = new Runner();
  runner.loadRom(rawBinaryData);
};

const runSingleFrame = () => {
  if (runner) {
    runner.runSingleFrame();
  }
};

export {calculateScreenFactor, loadRom, runSingleFrame};
