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