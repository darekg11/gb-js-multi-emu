export enum NON_PREFIX_OP_CODES {
    NOOP = 0x0,
    DISABLE_INTERRUPTS = 0xF3,
    ENABLE_INTERRUPTS = 0xFB,

    LOAD_TO_REG_A_VALUE_OF_REG_A = 0x7F,
    LOAD_TO_REG_A_VALUE_OF_REG_B = 0x78,
    LOAD_TO_REG_A_VALUE_OF_REG_C = 0x79,
    LOAD_TO_REG_A_VALUE_OF_REG_D = 0x7A,
    LOAD_TO_REG_A_VALUE_OF_REG_E = 0x7B,
    LOAD_TO_REG_A_VALUE_OF_REG_H = 0x7C,
    LOAD_TO_REG_A_VALUE_OF_REG_L = 0x7D,

    LOAD_TO_REG_B_VALUE_OF_REG_A = 0x47,
    LOAD_TO_REG_B_VALUE_OF_REG_B = 0x40,
    LOAD_TO_REG_B_VALUE_OF_REG_C = 0x41,
    LOAD_TO_REG_B_VALUE_OF_REG_D = 0x42,
    LOAD_TO_REG_B_VALUE_OF_REG_E = 0x43,
    LOAD_TO_REG_B_VALUE_OF_REG_H = 0x44,
    LOAD_TO_REG_B_VALUE_OF_REG_L = 0x45,

    LOAD_TO_REG_C_VALUE_OF_REG_A = 0x4F,
    LOAD_TO_REG_C_VALUE_OF_REG_B = 0x48,
    LOAD_TO_REG_C_VALUE_OF_REG_C = 0x49,
    LOAD_TO_REG_C_VALUE_OF_REG_D = 0x4A,
    LOAD_TO_REG_C_VALUE_OF_REG_E = 0x4B,
    LOAD_TO_REG_C_VALUE_OF_REG_H = 0x4C,
    LOAD_TO_REG_C_VALUE_OF_REG_L = 0x4D,

    LOAD_TO_REG_D_VALUE_OF_REG_A = 0x57,
    LOAD_TO_REG_D_VALUE_OF_REG_B = 0x50,
    LOAD_TO_REG_D_VALUE_OF_REG_C = 0x51,
    LOAD_TO_REG_D_VALUE_OF_REG_D = 0x52,
    LOAD_TO_REG_D_VALUE_OF_REG_E = 0x53,
    LOAD_TO_REG_D_VALUE_OF_REG_H = 0x54,
    LOAD_TO_REG_D_VALUE_OF_REG_L = 0x55,

    LOAD_TO_REG_E_VALUE_OF_REG_A = 0x5F,
    LOAD_TO_REG_E_VALUE_OF_REG_B = 0x58,
    LOAD_TO_REG_E_VALUE_OF_REG_C = 0x59,
    LOAD_TO_REG_E_VALUE_OF_REG_D = 0x5A,
    LOAD_TO_REG_E_VALUE_OF_REG_E = 0x5B,
    LOAD_TO_REG_E_VALUE_OF_REG_H = 0x5C,
    LOAD_TO_REG_E_VALUE_OF_REG_L = 0x5D,

    LOAD_TO_REG_H_VALUE_OF_REG_A = 0x67,
    LOAD_TO_REG_H_VALUE_OF_REG_B = 0x60,
    LOAD_TO_REG_H_VALUE_OF_REG_C = 0x61,
    LOAD_TO_REG_H_VALUE_OF_REG_D = 0x62,
    LOAD_TO_REG_H_VALUE_OF_REG_E = 0x63,
    LOAD_TO_REG_H_VALUE_OF_REG_H = 0x64,
    LOAD_TO_REG_H_VALUE_OF_REG_L = 0x65,

    LOAD_TO_REG_L_VALUE_OF_REG_A = 0x6F,
    LOAD_TO_REG_L_VALUE_OF_REG_B = 0x68,
    LOAD_TO_REG_L_VALUE_OF_REG_C = 0x69,
    LOAD_TO_REG_L_VALUE_OF_REG_D = 0x6A,
    LOAD_TO_REG_L_VALUE_OF_REG_E = 0x6B,
    LOAD_TO_REG_L_VALUE_OF_REG_H = 0x6C,
    LOAD_TO_REG_L_VALUE_OF_REG_L = 0x6D,

    LOAD_TO_REG_A_VALUE_OF_NEXT_MEMORY_CELL = 0x3E,
    LOAD_TO_REG_B_VALUE_OF_NEXT_MEMORY_CELL = 0x06,
    LOAD_TO_REG_C_VALUE_OF_NEXT_MEMORY_CELL = 0x0E,
    LOAD_TO_REG_D_VALUE_OF_NEXT_MEMORY_CELL = 0x16,
    LOAD_TO_REG_E_VALUE_OF_NEXT_MEMORY_CELL = 0x1E,
    LOAD_TO_REG_H_VALUE_OF_NEXT_MEMORY_CELL = 0x26,
    LOAD_TO_REG_L_VALUE_OF_NEXT_MEMORY_CELL = 0x2E,

    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x7E,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_DECREMENT_HL_AFTER = 0x3A,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_INCREMENT_HL_AFTER = 0x2A,
    LOAD_TO_REG_B_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x46,
    LOAD_TO_REG_C_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x4E,
    LOAD_TO_REG_D_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x56,
    LOAD_TO_REG_E_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x5E,
    LOAD_TO_REG_H_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x66,
    LOAD_TO_REG_L_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x6E,

    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER = 0x77,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_DECREMENT_HL_AFTER = 0x32,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER = 0x22,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_B_REGISTER = 0x70,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_C_REGISTER = 0x71,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_D_REGISTER = 0x72,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_E_REGISTER = 0x73,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_H_REGISTER = 0x74,
    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_L_REGISTER = 0x75,
    LOAD_TO_MEMORY_CELL_FROM_C_REGISTER_VALUE_OF_A_REGISTER = 0xE2,
    LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_A_REGISTER = 0xEA,
    LOAD_TO_MEMORY_CELL_COMBINED_FROM_NEXT_MEMORY_CELL_VALUE_OF_A_REGISTER = 0xE0,

    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_NEXT_MEMORY_CELL = 0x36,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER = 0x0A,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER = 0x1A,
    LOAD_TO_REG_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0xFA,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_C_REGISTER = 0xF2,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_INDEX_FROM_NEXT_MEMORY_CELL = 0xF0,

    LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER = 0x02,
    LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER = 0x12,

    LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x01,
    LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x11,
    LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x21,
    LOAD_TO_REG_SP_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x31,

    ADD_TO_REG_A_VALUE_OF_REG_B = 0x80,
    ADD_TO_REG_A_VALUE_OF_REG_C = 0x81,
    ADD_TO_REG_A_VALUE_OF_REG_D = 0x82,
    ADD_TO_REG_A_VALUE_OF_REG_E = 0x83,
    ADD_TO_REG_A_VALUE_OF_REG_H = 0x84,
    ADD_TO_REG_A_VALUE_OF_REG_L = 0x85,
    ADD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x86,
    ADD_TO_REG_A_VALUE_OF_REG_A = 0x87,

    ADC_TO_REG_A_VALUE_OF_REG_B = 0x88,
    ADC_TO_REG_A_VALUE_OF_REG_C = 0x89,
    ADC_TO_REG_A_VALUE_OF_REG_D = 0x8A,
    ADC_TO_REG_A_VALUE_OF_REG_E = 0x8B,
    ADC_TO_REG_A_VALUE_OF_REG_H = 0x8C,
    ADC_TO_REG_A_VALUE_OF_REG_L = 0x8D,
    ADC_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x8E,
    ADC_TO_REG_A_VALUE_OF_REG_A = 0x8F,

    SUB_FROM_REG_A_VALUE_OF_REG_B = 0x90,
    SUB_FROM_REG_A_VALUE_OF_REG_C = 0x91,
    SUB_FROM_REG_A_VALUE_OF_REG_D = 0x92,
    SUB_FROM_REG_A_VALUE_OF_REG_E = 0x93,
    SUB_FROM_REG_A_VALUE_OF_REG_H = 0x94,
    SUB_FROM_REG_A_VALUE_OF_REG_L = 0x95,
    SUB_FROM_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x96,
    SUB_FROM_REG_A_VALUE_OF_REG_A = 0x97,

    SBC_FROM_REG_A_VALUE_OF_REG_B = 0x98,
    SBC_FROM_REG_A_VALUE_OF_REG_C = 0x99,
    SBC_FROM_REG_A_VALUE_OF_REG_D = 0x9A,
    SBC_FROM_REG_A_VALUE_OF_REG_E = 0x9B,
    SBC_FROM_REG_A_VALUE_OF_REG_H = 0x9C,
    SBC_FROM_REG_A_VALUE_OF_REG_L = 0x9D,
    SBC_FROM_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x9E,
    SBC_FROM_REG_A_VALUE_OF_REG_A = 0x9F,

    AND_B = 0xA0,
    AND_C = 0xA1,
    AND_D = 0xA2,
    AND_E = 0xA3,
    AND_H = 0xA4,
    AND_L = 0xA5,
    AND_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xA6,
    AND_A = 0xA7,

    XOR_B = 0xA8,
    XOR_C = 0xA9,
    XOR_D = 0xAA,
    XOR_E = 0xAB,
    XOR_H = 0xAC,
    XOR_L = 0xAD,
    XOR_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xAE,
    XOR_A = 0xAF,

    OR_B = 0xB0,
    OR_C = 0xB1,
    OR_D = 0xB2,
    OR_E = 0xB3,
    OR_H = 0xB4,
}

export enum CB_OP_CODES {

}