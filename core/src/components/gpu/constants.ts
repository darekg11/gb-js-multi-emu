const SCANLINE_CPU_CYCLES = 456;
const OAM_MODE_CPU_CYCLES = 80;
const DMA_MODE_CPU_CYCLES = 172;
const HBLANK_CPU_CYCLES = 204
const LCD_ENABLE_REGISTER_BIT = 7;

enum LCD_MODES {
    HBLANK = 0,
    VLABNK = 1,
    OAM    = 2,
    DMA    = 3
}

export {
    SCANLINE_CPU_CYCLES,
    OAM_MODE_CPU_CYCLES,
    DMA_MODE_CPU_CYCLES,
    HBLANK_CPU_CYCLES,
    LCD_ENABLE_REGISTER_BIT,
    LCD_MODES
}