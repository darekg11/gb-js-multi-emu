export enum NON_PREFIX_OP_CODES {
    NOOP = 0x0,
    DISABLE_INTERRUPTS = 0xF3,
    ENABLE_INTERRUPTS = 0xFB,
    SCF = 0x37,
    CPL = 0x2F,
    CCF = 0x3F,
    DAA = 0x27,

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
    LOAD_HIGH_TO_MEMORY_CELL_COMBINED_FROM_NEXT_MEMORY_CELL_VALUE_OF_A_REGISTER = 0xE0,

    LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_NEXT_MEMORY_CELL = 0x36,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER = 0x0A,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER = 0x1A,
    LOAD_TO_REG_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0xFA,
    LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_C_REGISTER = 0xF2,
    LOAD_HIGH_TO_REG_A_VALUE_OF_MEMORY_INDEX_FROM_NEXT_MEMORY_CELL = 0xF0,

    LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER = 0x02,
    LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER = 0x12,

    LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x01,
    LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x11,
    LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x21,
    LOAD_TO_REG_SP_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS = 0x31,
    LOAD_TO_REG_SP_A_VALUE_OF_REG_HL = 0xF9,

    ADD_TO_SP_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xE8,
    LOAD_TO_REG_HL_A_VALUE_OF_SP_REG_PLUS_VALUE_FROM_NEXT_MEMORY_CELL = 0xF8,

    ADD_TO_REG_A_VALUE_OF_REG_B = 0x80,
    ADD_TO_REG_A_VALUE_OF_REG_C = 0x81,
    ADD_TO_REG_A_VALUE_OF_REG_D = 0x82,
    ADD_TO_REG_A_VALUE_OF_REG_E = 0x83,
    ADD_TO_REG_A_VALUE_OF_REG_H = 0x84,
    ADD_TO_REG_A_VALUE_OF_REG_L = 0x85,
    ADD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x86,
    ADD_TO_REG_A_VALUE_OF_REG_A = 0x87,
    ADD_TO_REG_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xC6,

    ADC_TO_REG_A_VALUE_OF_REG_B = 0x88,
    ADC_TO_REG_A_VALUE_OF_REG_C = 0x89,
    ADC_TO_REG_A_VALUE_OF_REG_D = 0x8A,
    ADC_TO_REG_A_VALUE_OF_REG_E = 0x8B,
    ADC_TO_REG_A_VALUE_OF_REG_H = 0x8C,
    ADC_TO_REG_A_VALUE_OF_REG_L = 0x8D,
    ADC_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x8E,
    ADC_TO_REG_A_VALUE_OF_REG_A = 0x8F,
    ADC_TO_REG_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xCE,

    SUB_FROM_REG_A_VALUE_OF_REG_B = 0x90,
    SUB_FROM_REG_A_VALUE_OF_REG_C = 0x91,
    SUB_FROM_REG_A_VALUE_OF_REG_D = 0x92,
    SUB_FROM_REG_A_VALUE_OF_REG_E = 0x93,
    SUB_FROM_REG_A_VALUE_OF_REG_H = 0x94,
    SUB_FROM_REG_A_VALUE_OF_REG_L = 0x95,
    SUB_FROM_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x96,
    SUB_FROM_REG_A_VALUE_OF_REG_A = 0x97,
    SUB_FROM_REG_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xD6,

    SBC_FROM_REG_A_VALUE_OF_REG_B = 0x98,
    SBC_FROM_REG_A_VALUE_OF_REG_C = 0x99,
    SBC_FROM_REG_A_VALUE_OF_REG_D = 0x9A,
    SBC_FROM_REG_A_VALUE_OF_REG_E = 0x9B,
    SBC_FROM_REG_A_VALUE_OF_REG_H = 0x9C,
    SBC_FROM_REG_A_VALUE_OF_REG_L = 0x9D,
    SBC_FROM_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x9E,
    SBC_FROM_REG_A_VALUE_OF_REG_A = 0x9F,
    SBC_FROM_REG_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xDE,

    AND_B = 0xA0,
    AND_C = 0xA1,
    AND_D = 0xA2,
    AND_E = 0xA3,
    AND_H = 0xA4,
    AND_L = 0xA5,
    AND_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xA6,
    AND_A = 0xA7,
    AND_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xE6,

    ADD_HL_BC = 0x09,
    ADD_HL_DE = 0x19,
    ADD_HL_HL = 0x29,
    ADD_HL_SP = 0x39,

    INC_BC = 0x03,
    INC_DE = 0x13,
    INC_HL = 0x23,
    INC_SP = 0x33,
    INC_A = 0x3C,
    INC_B = 0x04,
    INC_C = 0x0C,
    INC_D = 0x14,
    INC_E = 0x1C,
    INC_H = 0x24,
    INC_L = 0x2C,
    INC_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x34,

    DEC_A = 0x3D,
    DEC_B = 0x05,
    DEC_C = 0x0D,
    DEC_D = 0x15,
    DEC_E = 0x1D,
    DEC_H = 0x25,
    DEC_L = 0x2D,
    DEC_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0x35,
    DEC_BC = 0x0B,
    DEC_DE = 0x1B,
    DEC_HL = 0x2B,
    DEC_SP = 0x3B,

    XOR_B = 0xA8,
    XOR_C = 0xA9,
    XOR_D = 0xAA,
    XOR_E = 0xAB,
    XOR_H = 0xAC,
    XOR_L = 0xAD,
    XOR_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xAE,
    XOR_A = 0xAF,
    XOR_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xEE,

    OR_B = 0xB0,
    OR_C = 0xB1,
    OR_D = 0xB2,
    OR_E = 0xB3,
    OR_H = 0xB4,
    OR_L = 0xB5,
    OR_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xB6,
    OR_X = 0xB7,
    OR_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xF6,

    RLA = 0x17,
    RRA = 0x1F,
    RLCA = 0x07,
    RRCA = 0x0F,

    CP_B = 0xB8,
    CP_C = 0xB9,
    CP_D = 0xBA,
    CP_E = 0xBB,
    CP_H = 0xBC,
    CP_L = 0xBD,
    CP_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER = 0xBE,
    CP_A = 0xBF,
    CP_A_VALUE_FROM_NEXT_MEMORY_CELL = 0xFE,

    POP_BC = 0xC1,
    POP_DE = 0xD1,
    POP_HL = 0xE1,
    POP_AF = 0xF1,
    PUSH_BC = 0xC5,
    PUSH_DE = 0xD5,
    PUSH_HL = 0xE5,
    PUSH_AF = 0xF5,

    JMP_RELATIVE_IF_ZERO_FLAG_IS_NOT_SET = 0x20,
    JMP_RELATIVE_IF_ZERO_FLAG_IS_SET = 0x28,
    JMP_RELATIVE_IF_CARRY_FLAG_IS_NOT_SET = 0x30,
    JMP_RELATIVE_IF_CARRY_FLAG_IS_SET = 0x38,
    JMP_RELATIVE = 0x18,
    JMP_IF_ZERO_FLAG_IS_NOT_SET = 0xC2,
    JMP_IF_ZERO_FLAG_IS_SET = 0xCA,
    JMP_IF_CARRY_FLAG_IS_NOT_SET = 0xD2,
    JMP_IF_CARRY_FLAG_IS_SET = 0xDA,
    JMP = 0xC3,
    JMP_TO_HL = 0xE9,
    RST_0 = 0xC7,
    RST_08 = 0xCF,
    RST_10 = 0xD7,
    RST_18 = 0xDF,
    RST_20 = 0xE7,
    RST_28 = 0xEF,
    RST_30 = 0xF7,
    RST_38 = 0xFF,

    CALL_IF_ZERO_FLAG_IS_NOT_SET = 0xC4,
    CALL_IF_ZERO_FLAG_IS_SET = 0xCC,
    CALL_IF_CARRY_FLAG_IS_NOT_SET = 0xD4,
    CALL_IF_CARRY_IS_SET = 0xDC,
    CALL = 0xCD,

    RETURN_IF_ZERO_FLAG_IS_NOT_SET = 0xC0,
    RETURN_IF_ZERO_FLAG_IS_SET = 0xC8,
    RETURN_IF_CARRY_FLAG_IS_NOT_SET = 0xD0,
    RETURN_IF_CARRY_FLAG_IS_SET = 0xD8,
    RETURN = 0xC9,
    RETURN_AND_ENABLE_INTERRUPTS = 0xD9,

}

export enum CB_OP_CODES {
    RLCA = 0x07,
    RLCB = 0x00,
    RLCC = 0x01,
    RLCD = 0x02,
    RLCE = 0x03,
    RLCH = 0x04,
    RLCL = 0x05,
    RLCHL = 0x06,

    RRCA = 0x0F,
    RRCB = 0x08,
    RRCC = 0x09,
    RRCD = 0x0A,
    RRCE = 0x0B,
    RRCH = 0x0C,
    RRCL = 0x0D,
    RRCHL = 0x0E,

    RLA = 0x17,
    RLB = 0x10,
    RLC = 0x11,
    RLD = 0x12,
    RLE = 0x13,
    RLH = 0x14,
    RLL = 0x15,
    RLHL = 0x16,

    RRA = 0x1F,
    RRB = 0x18,
    RRC = 0x19,
    RRD = 0x1A,
    RRE = 0x1B,
    RRH = 0x1C,
    RRL = 0x1D,
    RRHL = 0x1E,

    SLAA = 0x27,
    SLAB = 0x20,
    SLAC = 0x21,
    SLAD = 0x22,
    SLAE = 0x23,
    SLAH = 0x24,
    SLAL = 0x25,
    SLAHL = 0x26,

    SRAA = 0x2F,
    SRAB = 0x28,
    SRAC = 0x29,
    SRAD = 0x2A,
    SRAE = 0x2B,
    SRAH = 0x2C,
    SRAL = 0x2D,
    SRAHL = 0x2E,

    SWAP_A = 0x37,
    SWAP_B = 0x30,
    SWAP_C = 0x31,
    SWAP_D = 0x32,
    SWAP_E = 0x33,
    SWAP_H = 0x34,
    SWAP_L = 0x35,
    SWAP_HL = 0x36,

    SRL_B = 0x38,
    SRL_C = 0x39,
    SRL_D = 0x3A,
}