export enum CARTRIGDE_TYPES {
    ROM_ONLY = 0x00,
    MBC_1 = 0x01,
    MBC_1_RAM = 0x02,
    MBC_1_RAM_BATTERY = 0x03,
    MBC_2 = 0x05,
    MBC_2_BATTERY = 0x06,
    ROM_RAM = 0x08,
    ROM_RAM_BATTERY = 0x09,
    MMM_01 = 0x0B,
    MMM_01_RAM = 0x0C,
    MMM_01_RAM_BATTERY = 0x0D,
    MBC_3_TIMER_BATTERY = 0x0F,
    MBC_3_TIMER_RAM_BATTERY = 0x10,
    MBC_3 = 0x11,
    MBC_3_RAM = 0x12,
    MBC_3_RAM_BATTERY = 0x13,
    MBC_5 = 0x19,
    MBC_5_RAM = 0x1A,
    MBC_5_RAM_BATTERY = 0x1B,
    MBC_5_RUMBLE = 0x1C,
    MBC_5_RUMBLE_RAM = 0x1D,
    MBC_5_RUMBLE_RAM_BATTERY = 0x1E,
    MBC_6 = 0x20,
    MBC_7_SENSOR_RUMBLE_RAM_BATTERY = 0x22,
    POCKET_CAMERA = 0xFC,
    BANDAI_TAMA_5 = 0xFD,
    HUC_3 = 0xFE,
    HUC_1_RAM_BATTERY = 0xFF,
    UNKNOWN = 0xBB
}

export enum ROM_SIZES {
    NO_ROM_BANKING = 0x00,
    FOUR_BANKS = 0x01, // 64 KBytes
    EIGHT_BANKS = 0x02, // 128 KBytes
    SIXTEEN_BANKS = 0x03, // 256 KBytes
    THIRTY_TWO_BANKS = 0x04, // 512 KBytes
    SIXTY_FOUR_BANKS = 0x05, // 1 MBytes -  only 63 banks used by MBC1
    ONE_HUNDRED_TWENTY_EIGHT_BANKS = 0x06, // 2 MBytes - only 125 banks used by MBC1
    TWO_HUNDRED_FIFTY_SIX_BANKS = 0x07, // 4 MBytes
    FIVE_HUNDRED_TWELVE_BANKS = 0x08, // 8 MBytes
    SEVENTY_TWO_BANKS = 0x52, // 1.1 MBytes
    EIGHTY_BANKS = 0x53, // 1.2 MBytes
    NINETY_SIX_BANKS = 0x54, // 1.5 MBytes
    UNKNOWN = 0xBB
}

export enum RAM_SIZE {
    NONE = 0x00,
    TWO_KILOBYTES = 0x01,
    EIGHT_KILOBYTES = 0x02,
    THIRTY_TWO_KILOBYTES = 0x03, // (4 banks of 8KBytes each)
    ONE_HUNDRED_TWENTY_EIGHT_KILOBYTES = 0x04, // (16 banks of 8KBytes each)
    SIXTY_FOUR_KILOBYTES = 0x05, // (8 banks of 8KBytes each)
    UNKNOWN = 0xBB
}

export enum DESTINATION_CODES {
    JAPANESE = 0x00,
    NON_JAPANESE = 0x01,
    UNKNOWN = 0xBB
}