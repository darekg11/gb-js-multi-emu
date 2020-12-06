import Memory from "../../../memory";
import {
    LCD_WIDTH,
    LCD_HEIGHT,
    LCD_BACKGROUND_ENABLE_BIT,
    LCD_BACKGROUND_TILE_MAP_BIT,
    LCD_WINDOW_TILE_MAP_BIT,
    LCD_SPRITES_ENABLE_BIT,
    LCD_WINDOW_ENABLE_BIT,
    LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT
} from "../../constants";
import REGISTERS from "../../../memory/constants";
import { numberUtils } from "../../../../utils";
import IRenderer from "../types";

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
        const signedTileIndex = !numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT);
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

        // {return v & 0x80 ? v-256 : v;},
        // 128 & 0x80 ( 128) === 128
        // 127 & 0x80 === 0
    }

    // renders sprites
    public renderSprites (pixelBuffer: Uint8ClampedArray, memory: Memory) {

    }
}

export default Renderer;