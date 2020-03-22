export enum REGULAR_OP_CODES {
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
}

export enum CB_OP_CODES {

}