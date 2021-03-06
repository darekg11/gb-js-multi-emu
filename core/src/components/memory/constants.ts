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

const LCD_STAT_REGISTER = 0xFF41; // READ / WRITE
//  Bit 6 - LYC=LY Coincidence Interrupt (1=Enable) (Read/Write)
//  Bit 5 - Mode 2 OAM Interrupt         (1=Enable) (Read/Write)
//  Bit 4 - Mode 1 V-Blank Interrupt     (1=Enable) (Read/Write)
//  Bit 3 - Mode 0 H-Blank Interrupt     (1=Enable) (Read/Write)
//  Bit 2 - Coincidence Flag             (0:LYC<>LY, 1:LYC=LY) (Read Only)
//  Bit 0 & Bit 1 - Mode flag:
//      0: During H-Blank
//      1: During V-Blank
//      2: During Searching OAM
//      3: During Transferring Data to LCD Driver

const BACKGROUND_PALLETE_REGISTER = 0xFF47; // READ / WRITE
const OBJECT_PALLETE_ZERO_REGISTER = 0xFF48; // READ / WRITE
const OBJECT_PALLETE_ONE_REGISTER = 0xFF49; // READ / WRITE
const SCROLL_Y_REGISTER = 0xFF42; // READ / WRITE
const SCROLL_X_REGISTER = 0xFF43; // READ / WRITE
const LY_REGISTER = 0xFF44; // READ -> The LY indicates the vertical line to which the present data is transferred to the LCD Driver.
                            // The LY can take on any value between 0 through 153.
                            // The values between 144 and 153 indicate the V-Blank period and should generate interrupt.
                            // Writing will reset the counter.
const LYC_REGISTER = 0xFF45; // READ / WRITE -> The gameboy permanently compares the value of the LYC and LY registers.
                             // When both values are identical, the coincident bit in the STAT register becomes set, and (if enabled) a STAT interrupt is requested.

const DMA_TRANSFER_START_REGISTER = 0xFF46; // READ / WRITE -> Writing to this register launches a DMA transfer from ROM or RAM to OAM memory (sprite attribute table).
                                            // The written value specifies the transfer source address divided by 100h
const WINDOW_Y_REGISTER = 0xFF4A; // READ / WRITE
const WINDOW_X_REGISTER = 0xFF4B; // READ / WRITE
// Specifies the upper/left positions of the Window area. (The window is an alternate background area which can be displayed above of the normal background. OBJs (sprites) may be still displayed above or behinf the window, just as for normal BG.)
// The window becomes visible (if enabled) when positions are set in range WX=0..166, WY=0..143. A postion of WX=7, WY=0 locates the window at upper left, it is then completly covering normal background.

const VRAM_AREA_START_INDEX = 0x8000;
const VRAM_AREA_END_INDEX = 0x9FFF;
const OAM_AREA_START_INDEX = 0xFE00;
const OAM_AREA_END_INDEX = 0xFE9F;
const BACKGROUND_WINDOW_TILE_DATA_ZERO_START_INDEX = 0x8800;
const BACKGROUND_WINDOW_TILE_DATA_FIRST_START_INDEX = 0x8000;
const BACKGROUND_TILE_MAP_ZERO_START_INDEX = 0x9800;
const BACKGROUND_TILE_MAP_FIRST_START_INDEX = 0x9C00;
const WINDOW_TILE_MAP_ZERO_START_INDEX = 0x9800;
const WINDOW_TILE_MAP_FIRST_START_INDEX = 0x9C00;

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

const INTERRUPT_ENABLE_REGISTER = 0xFFFF; // READ / WRITE
                                          // Bit 0 -> VBLANK, JMP ADDRESS: 0x40
                                          // Bit 1 -> LCD_STAT, JMP ADDRESS: 0x48
                                          // Bit 2 -> TIMA TIMER, JMP ADDRESS: 0x50
                                          // Bit 3 -> SERIAL PORT, JMP ADDRESS: 0x58
                                          // Bit 4 -> JOYPAD, JMP ADDRESS: 0x60
const INTERRUPT_REQUEST_REGISTER = 0xFF0F; // READ / WRITE
                                           // Bit 0 -> VBLANK, HIGHEST PRIORITY
                                           // Bit 1 -> LCD STAT
                                           // Bit 2 -> TIMA TIMER
                                           // Bit 3 -> SERIAL
                                           // Bit 4 -> JOYPAD, LOWEST PRIORITY

const JOYPAD_STATE_REGISTER = 0xFF00; // READ / WRITE:
                                      // The eight gameboy buttons/direction keys are arranged in form of a 2x4 matrix.
                                      // Select either button or direction keys by writing to this register, then read-out bit 0-3.
                                      // Bit 7 - Not used
                                      // Bit 6 - Not used
                                      // Bit 5 - P15 Select Button Keys      (0=Select)
                                      // Bit 4 - P14 Select Direction Keys   (0=Select)
                                      // Bit 3 - P13 Input Down  or Start    (0=Pressed) (Read Only)
                                      // Bit 2 - P12 Input Up    or Select   (0=Pressed) (Read Only)
                                      // Bit 1 - P11 Input Left  or Button B (0=Pressed) (Read Only)
                                      // Bit 0 - P10 Input Right or Button A (0=Pressed) (Read Only)
const REGISTERS_MAP = {
    GPU: {
        LCD_CONTROL_REGISTER,
        LCD_STAT_REGISTER,
        BACKGROUND_PALLETE_REGISTER,
        OBJECT_PALLETE_ZERO_REGISTER,
        OBJECT_PALLETE_ONE_REGISTER,
        SCROLL_Y_REGISTER,
        SCROLL_X_REGISTER,
        LY_REGISTER,
        LYC_REGISTER,
        WINDOW_Y_REGISTER,
        WINDOW_X_REGISTER,
        BACKGROUND_WINDOW_TILE_DATA_ZERO_START_INDEX,
        BACKGROUND_WINDOW_TILE_DATA_FIRST_START_INDEX,
        BACKGROUND_TILE_MAP_ZERO_START_INDEX,
        BACKGROUND_TILE_MAP_FIRST_START_INDEX,
        WINDOW_TILE_MAP_ZERO_START_INDEX,
        WINDOW_TILE_MAP_FIRST_START_INDEX
    },
    MEMORY: {
        VRAM_AREA_START_INDEX,
        VRAM_AREA_END_INDEX,
        OAM_AREA_START_INDEX,
        OAM_AREA_END_INDEX,
        DMA_TRANSFER_START_REGISTER
    },
    MISC: {
        UNMAP_ROM_REGISTER
    },
    TIMERS: {
        TIMA_REGISTER,
        TAC_REGISTER,
        TMA_REGISTER,
        DIV_REGISTER
    },
    INTERRUPTS: {
        INTERRUPT_ENABLE_REGISTER,
        INTERRUPT_REQUEST_REGISTER
    },
    JOYPAD: {
        STATE: JOYPAD_STATE_REGISTER
    }
}

export default _.cloneDeep(REGISTERS_MAP);