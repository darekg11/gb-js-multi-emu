import _ from "lodash";

const LCD_CONTROL_REGISTER = 0xFF40; // READ / WRITE
//  Bit 7 - LCD Display Enable             (0=Off, 1=On)
//  Bit 6 - Window Tile Map Display Select (0=9800-9BFF, 1=9C00-9FFF)
//  Bit 5 - Window Display Enable          (0=Off, 1=On)
//  Bit 4 - BG & Window Tile Data Select   (0=8800-97FF, 1=8000-8FFF)
//  Bit 3 - BG Tile Map Display Select     (0=9800-9BFF, 1=9C00-9FFF)
//  Bit 2 - OBJ (Sprite) Size              (0=8x8, 1=8x16)
//  Bit 1 - OBJ (Sprite) Display Enable    (0=Off, 1=On)
//  Bit 0 - BG/Window Display/Priority     (0=Off, 1=On)

const BACKGROUND_PALLETE_REGISTER = 0xFF47; // READ / WRITE
const OBJECT_PALLETE_ZERO_REGISTER = 0xFF48; // READ / WRITE
const OBJECT_PALLETE_ONE_REGISTER = 0xFF49; // READ / WRITE
const SCROLL_Y_REGISTER = 0xFF42; // READ / WRITE
const SCROLL_X_REGISTER = 0xFF43; // READ / WRITE
const LY_REGISTER = 0xFF44; // READ -> The LY indicates the vertical line to which the present data is transferred to the LCD Driver.
                            // The LY can take on any value between 0 through 153.
                            // The values between 144 and 153 indicate the V-Blank period and should generate interrupt. Writing will reset the counter.
const LYC_REGISTER = 0xFF45; // READ / WRITE -> The gameboy permanently compares the value of the LYC and LY registers.
                             // When both values are identical, the coincident bit in the STAT register becomes set, and (if enabled) a STAT interrupt is requested.
const WINDOW_Y_REGISTER = 0xFF4A; // READ / WRITE
const WINDOW_X_REGISTER = 0xFF4B; // READ / WRITE
// Specifies the upper/left positions of the Window area. (The window is an alternate background area which can be displayed above of the normal background. OBJs (sprites) may be still displayed above or behinf the window, just as for normal BG.)
// The window becomes visible (if enabled) when positions are set in range WX=0..166, WY=0..143. A postion of WX=7, WY=0 locates the window at upper left, it is then completly covering normal background.

const VRAM_AREA_START_INDEX = 0x8000;
const VRAM_AREA_END_INDEX = 0x9FFF;

const UNMAP_ROM_REGISTER = 0xFF50; // Set to non-zero to disable boot ROM unmapping it and moving ROM to the begginig of memory -> done at the end of BIOS sequence.

const TIMA_REGISTER = 0xFF05; // READ / WRITE
                              // The timer is located in memoy address 0xFF05 and will count up at a set frequency.
                              // Whenever the timer overflows it requests a timer interupt and then resets itself to the value of the timer modulator in memory address 0xFF06
const TAC_REGISTER = 0xFF07;  // Frequency determining speed of timer incrementation.
                              // Possible values and meaning:
                              // https://gbdev.io/pandocs/#timer-and-divider-registers
                              // 
                              // Bit  2   - Timer Enable
                              // Bits 1-0 - Input Clock Select
                              // 00: CPU Clock / 1024 (DMG, SGB2, CGB Single Speed Mode:   4096 Hz, SGB1:   ~4194 Hz, CGB Double Speed Mode:   8192 Hz)
                              // 01: CPU Clock / 16   (DMG, SGB2, CGB Single Speed Mode: 262144 Hz, SGB1: ~268400 Hz, CGB Double Speed Mode: 524288 Hz)
                              // 10: CPU Clock / 64   (DMG, SGB2, CGB Single Speed Mode:  65536 Hz, SGB1:  ~67110 Hz, CGB Double Speed Mode: 131072 Hz)
                              // 11: CPU Clock / 256  (DMG, SGB2, CGB Single Speed Mode:  16384 Hz, SGB1:  ~16780 Hz, CGB Double Speed Mode:  32768 Hz)
const TMA_REGISTER = 0xFF06;  // READ / WRITE
                              // When the TIMA overflows, this data will be loaded.
const DIV_REGISTER = 0xFF04;  // This register is incremented at rate of 16384Hz (~16779Hz on SGB).
                              // Writing any value to this register resets it to 00h.
                              // Note: The divider is affected by CGB double speed mode, and will increment at 32768Hz in double speed.

const REGISTERS_MAP = {
    GPU: {
        LCD_CONTROL_REGISTER,
        BACKGROUND_PALLETE_REGISTER,
        OBJECT_PALLETE_ZERO_REGISTER,
        OBJECT_PALLETE_ONE_REGISTER,
        SCROLL_Y_REGISTER,
        SCROLL_X_REGISTER,
        LY_REGISTER,
        LYC_REGISTER,
        WINDOW_Y_REGISTER,
        WINDOW_X_REGISTER
    },
    MEMORY: {
        VRAM_AREA_START_INDEX,
        VRAM_AREA_END_INDEX
    },
    MISC: {
        UNMAP_ROM_REGISTER
    },
    TIMERS: {
        TIMA_REGISTER,
        TAC_REGISTER,
        TMA_REGISTER,
        DIV_REGISTER
    }
}

export default _.cloneDeep(REGISTERS_MAP);