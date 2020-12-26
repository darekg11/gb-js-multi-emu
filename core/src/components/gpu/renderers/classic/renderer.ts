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
    MAX_TILES,
    LCD_SPRITES_SIZE_BIT,
    MAX_SPRITES,
    OAM_ENTRY_SIZE_BYTES,
    OAM_ENTRY_INDEXES,
    SPRITE_ATTRIBUTES_BITS
} from "../../constants";
import REGISTERS from "../../../memory/constants";
import { numberUtils } from "../../../../utils";
import { IColor, IRenderer } from "../types";
import { getSignedValue } from "../../../../utils/numbers";
import { BLACK, WHITE, LIGHT_GREY, DARK_GREY } from "./colors";


// It's pixel buffer renderer for Classic GameBoy
class Renderer implements IRenderer {
    private pixelBuffer = new Uint8ClampedArray(LCD_WIDTH * LCD_HEIGHT * 4);
    public drawScanLine (memory: Memory): Uint8ClampedArray {
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const CURRENT_LINE = memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
        const WINDOW_Y = memory.read8BitsValue(REGISTERS.GPU.WINDOW_Y_REGISTER);
        const backgroundEnabled = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_ENABLE_BIT);
        const windowEnabled = numberUtils.isBitSet(lcdStatus, LCD_WINDOW_ENABLE_BIT);
        const spritesEnabled = numberUtils.isBitSet(lcdStatus, LCD_SPRITES_ENABLE_BIT);

        if (backgroundEnabled) {
            this.drawBackground(memory);
        }

        if (windowEnabled && CURRENT_LINE >= WINDOW_Y) {
            this.drawWindow(memory);
        }

        if (spritesEnabled) {
            // this.renderSprites(memory);
        }

        return this.pixelBuffer;
    }

    private drawBackground (memory: Memory) {
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const SCROLL_X = memory.read8BitsValue(REGISTERS.GPU.SCROLL_X_REGISTER);
        const SCROLL_Y = memory.read8BitsValue(REGISTERS.GPU.SCROLL_Y_REGISTER);
        const CURRENT_LINE = memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
        const PALLETE = memory.read8BitsValue(REGISTERS.GPU.BACKGROUND_PALLETE_REGISTER);
        const unsignedTileIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT);
        const tileMapMemoryIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_TILE_MAP_BIT) ?
            REGISTERS.GPU.BACKGROUND_TILE_MAP_FIRST_START_INDEX :
            REGISTERS.GPU.BACKGROUND_TILE_MAP_ZERO_START_INDEX;

        const tileDataRegionStartIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT) ?
            REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_FIRST_START_INDEX :
            REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_ZERO_START_INDEX;

        const y = SCROLL_Y + CURRENT_LINE;
        for (let pixel = 0; pixel < LCD_WIDTH; pixel++) {
            const x = SCROLL_X + pixel;

            const col = (x & 0xFF) >> 3;
            const row = (y & 0xFF) >> 3;

            const tileAddress = tileMapMemoryIndex + (row * MAX_TILES) + col;
            const tileIndex = unsignedTileIndex ? memory.read8BitsValue(tileAddress) : getSignedValue(memory.read8BitsValue(tileAddress)) + 128;
            // 8*8 pixels == 64
            // 64 * 2 = 128 // each pixel is 2 bytes
            // 128 / 8 = 16;
            const tileMemory = tileDataRegionStartIndex + (tileIndex * 16);
            // find the correct vertical line we're on of the
            // tile to get the tile data
            // from in memory
            // each vertical line takes up two bytes of memory
            const line = (y % 8) * 2;

            const firstByte = memory.read8BitsValue(tileMemory + line);
            const secondByte = memory.read8BitsValue(tileMemory + line + 1);
            // Pixel 0 in the tile is bit 7 of data 1 and data2.
            // Pixel 1 is bit 6 etc..
            const colourBit = ((x % 8) - 7) * -1;
            const colorIdFirstBit = numberUtils.isBitSet(secondByte, colourBit) ? 1 : 0;
            const colorIdSecondBit = numberUtils.isBitSet(firstByte, colourBit) ? 1 : 0;
            const colorId = (colorIdFirstBit << 1) | colorIdSecondBit;
            const color = this.getColorFromPallete(PALLETE, colorId);

            this.setPixel(pixel, CURRENT_LINE, color);
        }
    }

    private drawWindow (memory: Memory) {
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const WINDOW_X = memory.read8BitsValue(REGISTERS.GPU.WINDOW_X_REGISTER) - 7;
        const WINDOW_Y = memory.read8BitsValue(REGISTERS.GPU.WINDOW_Y_REGISTER);
        const CURRENT_LINE = memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
        const PALLETE = memory.read8BitsValue(REGISTERS.GPU.BACKGROUND_PALLETE_REGISTER);
        const unsignedTileIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT);

        const tileMapMemoryIndex = numberUtils.isBitSet(lcdStatus, LCD_WINDOW_TILE_MAP_BIT) ?
                REGISTERS.GPU.WINDOW_TILE_MAP_FIRST_START_INDEX :
                REGISTERS.GPU.WINDOW_TILE_MAP_ZERO_START_INDEX;

        const tileDataRegionStartIndex = numberUtils.isBitSet(lcdStatus, LCD_BACKGROUND_WINDOW_TILE_DATA_REGION_INDEX_BIT) ?
                REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_FIRST_START_INDEX :
                REGISTERS.GPU.BACKGROUND_WINDOW_TILE_DATA_ZERO_START_INDEX;

        const y = CURRENT_LINE - WINDOW_Y;

        for (let pixel = WINDOW_X; pixel < LCD_WIDTH; pixel++) {
            const x = pixel - WINDOW_X;

            const col = (x & 0xFF) >> 3;
            const row = (y & 0xFF) >> 3;

            const tileAddress = tileMapMemoryIndex + (row * MAX_TILES) + col;
            const tileIndex = unsignedTileIndex ? memory.read8BitsValue(tileAddress) : getSignedValue(memory.read8BitsValue(tileAddress)) + 128;
            // 8*8 pixels == 64
            // 64 * 2 = 128 // each pixel is 2 bytes
            // 128 / 8 = 16;
            const tileMemory = tileDataRegionStartIndex + (tileIndex * 16);
            // find the correct vertical line we're on of the
            // tile to get the tile data
            // from in memory
            // each vertical line takes up two bytes of memory
            const line = (y % 8) * 2;

            const firstByte = memory.read8BitsValue(tileMemory + line);
            const secondByte = memory.read8BitsValue(tileMemory + line + 1);
            // Pixel 0 in the tile is bit 7 of data 1 and data2.
            // Pixel 1 is bit 6 etc..
            const colourBit = ((x % 8) - 7) * -1;
            const colorIdFirstBit = numberUtils.isBitSet(secondByte, colourBit) ? 1 : 0;
            const colorIdSecondBit = numberUtils.isBitSet(firstByte, colourBit) ? 1 : 0;
            const colorId = (colorIdFirstBit << 1) | colorIdSecondBit;
            const color = this.getColorFromPallete(PALLETE, colorId);

            this.setPixel(pixel, CURRENT_LINE, color);
        }
    }

    // renders sprites
    public renderSprites (memory: Memory) {
        const lcdStatus = memory.read8BitsValue(REGISTERS.GPU.LCD_CONTROL_REGISTER);
        const areSprites16PixelsHeight = numberUtils.isBitSet(lcdStatus, LCD_SPRITES_SIZE_BIT);
        const ySizeOfSpritesInPixels = areSprites16PixelsHeight ? 16 : 8;
        const CURRENT_LINE = memory.read8BitsValue(REGISTERS.GPU.LY_REGISTER);
        
        for (let sprite = 0; sprite < MAX_SPRITES; sprite++) {
            // each entry takes 4 bytes;
            const spriteIndexInOAM = sprite * OAM_ENTRY_SIZE_BYTES;
            const spriteY = memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + spriteIndexInOAM + OAM_ENTRY_INDEXES.Y_POSITION) - 16;
            const spriteX = memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + spriteIndexInOAM + OAM_ENTRY_INDEXES.X_POSITION) - 8;
            const tileIndex = memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + spriteIndexInOAM + OAM_ENTRY_INDEXES.TILE_INDEX);
            const spriteAttributes = memory.read8BitsValue(REGISTERS.MEMORY.OAM_AREA_START_INDEX + spriteIndexInOAM + OAM_ENTRY_INDEXES.ATTRIBUTES);

            const xFlip = numberUtils.isBitSet(spriteAttributes, SPRITE_ATTRIBUTES_BITS.X_FLIP);
            const yFlip = numberUtils.isBitSet(spriteAttributes, SPRITE_ATTRIBUTES_BITS.Y_FLIP);
            const PALLETE = numberUtils.isBitSet(spriteAttributes, SPRITE_ATTRIBUTES_BITS.PALLETE_NUMBER) ? REGISTERS.GPU.OBJECT_PALLETE_ONE_REGISTER : REGISTERS.GPU.OBJECT_PALLETE_ZERO_REGISTER;

            if (CURRENT_LINE >= spriteY && (CURRENT_LINE < (spriteY + ySizeOfSpritesInPixels))) {
                let line = CURRENT_LINE - spriteY;
                if (yFlip) {
                    // read the sprite in backwards in the y axis
                    line -= ySizeOfSpritesInPixels;
                    line *= -1;
                }
                // each line takes 2 bytes in memory
                line *= 2;

                const spriteMemory = (REGISTERS.MEMORY.VRAM_AREA_START_INDEX + (tileIndex * 16));
                const firstByte = memory.read8BitsValue(spriteMemory + line);
                const secondByte = memory.read8BitsValue(spriteMemory + line + 1);

                for (let spritePixel = 7; spritePixel >= 0; spritePixel--) {
                    const colourBit = xFlip ? (spritePixel - 7) * -1 : spritePixel;
                    const colorIdFirstBit = numberUtils.isBitSet(secondByte, colourBit) ? 1 : 0;
                    const colorIdSecondBit = numberUtils.isBitSet(firstByte, colourBit) ? 1 : 0;
                    const colorId = (colorIdFirstBit << 1) | colorIdSecondBit;
                    const color = this.getColorFromPallete(PALLETE, colorId);

                    // white is transparent for sprites.
                    // shitty way to check but whatever
                    if (color.blue === 255 && color.green === 255 && color.red === 255) {
                        continue;
                    }

                    // to go from left to right
                    const xPixel = 0 - spritePixel + 7;

                    this.setPixel(spriteX + xPixel, CURRENT_LINE, color);
                }
            }
        }
    }

    private getColorFromPallete (pallete: number, color: number): IColor {
        let palleteColorIdLowBit = color * 2
        let palleteColorIdHighBit = palleteColorIdLowBit + 1;
        const colorIdHighBit = numberUtils.isBitSet(pallete, palleteColorIdHighBit) ? 1 : 0;
        const colorIdLowBit = numberUtils.isBitSet(pallete, palleteColorIdLowBit) ? 1 : 0;
        const colorId = (colorIdHighBit << 1) | colorIdLowBit;

        switch (colorId) {
            case 0:
                return WHITE;
            case 1:
                return LIGHT_GREY;
            case 2:
                return DARK_GREY;
            case 3:
                return BLACK;
            default:
                return WHITE;
            }
    }

    private setPixel(x: number, y: number, color: IColor) {
        const offset = (y * LCD_WIDTH + x) * 4;
        this.pixelBuffer[offset + 0] = color.red;
        this.pixelBuffer[offset + 1] = color.green;
        this.pixelBuffer[offset + 2] = color.blue;
        this.pixelBuffer[offset + 3] = color.alpha;
    }
}

export default Renderer;