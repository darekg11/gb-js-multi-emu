import Memory from "../../../memory";
import {
    LCD_WIDTH,
    LCD_HEIGHT,
    LCD_BACKGROUND_ENABLE_BIT,
    LCD_BACKGROUND_TILE_MAP_BIT,
    LCD_WINDOW_TILE_MAP_BIT,
    LCD_SPRITES_ENABLE_BIT,
    LCD_WINDOW_ENABLE_BIT,
    LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT,
    MAX_TILES
} from "../../constants";
import REGISTERS from "../../../memory/constants";
import { numberUtils } from "../../../../utils";
import { IColor, IRenderer } from "../types";
import { getSignedValue } from "../../../../utils/numbers";


// It's pixel buffer renderer for Classic GameBoy
class Renderer implements IRenderer {
    public drawScanLine (memory: Memory): Uint8ClampedArray {
        // it's WIDTH * HEIGHT * 4 bytes per each pixel
        // RGBA format
        const pixelBuffer = new Uint8ClampedArray(LCD_WIDTH * LCD_HEIGHT * 4);
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const backgroundEnabled = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_ENABLE_BIT);
        const spritesEnabled = numberUtils.isBitSet(lcdStatus, LCD_SPRITES_ENABLE_BIT);

        if (backgroundEnabled) {
            this.renderBackground(pixelBuffer, memory);
        }

        if (spritesEnabled) {
            this.renderSprites(pixelBuffer, memory);
        }

        return pixelBuffer;
    }

    // renders background tiles + window
    public renderBackground (pixelBuffer: Uint8ClampedArray, memory: Memory) {
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const SCROLL_X = memory.read8BitsValue(REGISTERS.GPU.SCROLL_X_REGISTER);
        const SCROLL_Y = memory.read8BitsValue(REGISTERS.GPU.SCROLL_Y_REGISTER);
        const WINDOW_X = memory.read8BitsValue(REGISTERS.GPU.WINDOW_X_REGISTER) - 7;
        const WINDOW_Y = memory.read8BitsValue(REGISTERS.GPU.WINDOW_Y_REGISTER);
        const CURRENT_LINE = memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);

        const isWindowDraw = numberUtils.isBitSet(lcdStatus, LCD_WINDOW_ENABLE_BIT) && WINDOW_Y <= CURRENT_LINE;
        const tileDataRegionStartIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT) ?
            REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_FIRST_START_INDEX :
            REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_ZERO_START_INDEX;
        const unsignedTileIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT);
        let tileMapMemoryIndex = 0;
        if (isWindowDraw) {
            tileMapMemoryIndex = numberUtils.isBitSet(lcdStatus, LCD_WINDOW_TILE_MAP_BIT) ?
                REGISTERS.GPU.WINDOW_TILE_MAP_FIRST_START_INDEX :
                REGISTERS.GPU.WINDOW_TILE_MAP_ZERO_START_INDEX;
        } else {
            tileMapMemoryIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_TILE_MAP_BIT) ?
                REGISTERS.GPU.BACKGROUND_TILE_MAP_FIRST_START_INDEX : 
                REGISTERS.GPU.BACKGROUND_TILE_MAP_ZERO_START_INDEX;
        }

        const currentLineInPerspective = isWindowDraw ? CURRENT_LINE - WINDOW_Y : CURRENT_LINE + SCROLL_Y;
        const tileRow = Math.floor((currentLineInPerspective / 8)) * MAX_TILES;

        for (let pixel = 0; pixel < LCD_WIDTH; pixel++) {
            let xPos = (pixel + SCROLL_X) & 255;
            xPos = isWindowDraw && pixel >= WINDOW_X ? pixel - WINDOW_X : xPos;
            xPos = xPos & 255;

            const tileColumn = Math.floor((xPos / 8));
            const tileAddress = tileMapMemoryIndex + tileRow + tileColumn;
            const tileIndex = unsignedTileIndex ? memory.read8BitsValue(tileAddress) : getSignedValue(memory.read8BitsValue(tileAddress)) + 128;
            // 8*8 pixels == 64
            // 64 * 2 = 128 // each pixel is 2 bytes
            // 128 / 8 = 16;
            const tileMemory = tileIndex * 16;
            // find the correct vertical line we're on of the
            // tile to get the tile data
            // from in memory
            // each vertical line takes up two bytes of memory
            const line = (currentLineInPerspective % 8) * 2;
            
            const firstByte = memory.read8BitsValue(tileMemory + line);
            const secondByte = memory.read8BitsValue(tileMemory + line + 1);
            // Pixel 0 in the tile is bit 7 of data 1 and data2.
            // Pixel 1 is bit 6 etc..
            const colourBit = ((xPos % 8) - 7) * -1;
        }
    }

    // renders sprites
    public renderSprites (pixelBuffer: Uint8ClampedArray, memory: Memory) {

    }

    private setPixel(pixelBuffer: Uint8ClampedArray, x: number, y: number, color: IColor) {
        pixelBuffer[y * LCD_WIDTH + x + 0] = color.red;
        pixelBuffer[y * LCD_WIDTH + x + 1] = color.green;
        pixelBuffer[y * LCD_WIDTH + x + 2] = color.blue;
        pixelBuffer[y * LCD_WIDTH + x + 3] = color.alpha;
    }
}

export default Renderer;