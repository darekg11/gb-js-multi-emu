import { NON_PREFIX_OP_CODES } from "./opcodes/OP_CODES_ENUM";

import NOOP_HANDLER from "./opcodes/MISCELLANEOUS/NOOP/index";
import LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS"
import LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER_HANDLER from "./opcodes/LOAD/LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER";
import INC_BC_HANDLER from "./opcodes/MATH/INC_BC";
import INC_B_HANDLER from "./opcodes/MATH/INC_B";
import DEC_B_HANDLER from "./opcodes/MATH/DEC_B";
import LOAD_TO_REG_B_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_B_VALUE_FROM_NEXT_MEMORY_CELL";
import RLCA_NON_PREFIX_HANDLER from "./opcodes/BITS/RLCA";
import LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_SP_REGISTER_HANDLER from "./opcodes/LOAD/LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_SP_REGISTER";
import ADD_HL_BC_HANDLER from "./opcodes/MATH/ADD_HL_BC";
import LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER";
import DEC_BC_HANDLER from "./opcodes/MATH/DEC_BC";
import INC_C_HANDLER from "./opcodes/MATH/INC_C";
import DEC_C_HANDLER from "./opcodes/MATH/DEC_C";
import LOAD_TO_REG_C_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_C_VALUE_FROM_NEXT_MEMORY_CELL";
import RRCA_NON_PREIFX_HANDLER from "./opcodes/BITS/RRCA";
import LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS";
import LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER_HANDLER from "./opcodes/LOAD/LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER";
import INC_DE_HANDLER from "./opcodes/MATH/INC_DE";
import INC_D_HANDLER from "./opcodes/MATH/INC_D";
import DEC_D_HANDLER from "./opcodes/MATH/DEC_D";
import LOAD_TO_REG_D_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_D_VALUE_FROM_NEXT_MEMORY_CELL";
import RLA_NON_PREFIX_HANDLER from "./opcodes/BITS/RLA";
import JMP_RELATIVE_HANDLER from "./opcodes/JMP/JMP_RELATIVE";
import ADD_HL_DE_HANDLER from "./opcodes/MATH/ADD_HL_DE";
import LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER";
import DEC_DE_HANDLER from "./opcodes/MATH/DEC_DE";
import INC_E_HANDLER from "./opcodes/MATH/INC_E";
import DEC_E_HANDLER from "./opcodes/MATH/DEC_E";
import LOAD_TO_REG_E_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_E_VALUE_FROM_NEXT_MEMORY_CELL";
import RRA_NON_PREFIX_HANDLER from "./opcodes/BITS/RRA";
import JMP_RELATIVE_IF_ZERO_FLAG_IS_NOT_SET_HANDLER from "./opcodes/JMP/JMP_RELATIVE_IF_ZERO_FLAG_IS_NOT_SET";
import LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS";
import LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER_HANDLER from "./opcodes/LOAD/LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER";
import INC_HL_HANDLER from "./opcodes/MATH/INC_HL";
import INC_H_HANDLER from "./opcodes/MATH/INC_H";
import DEC_H_HANDLER from "./opcodes/MATH/DEC_H";
import LOAD_TO_REG_H_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_H_VALUE_FROM_NEXT_MEMORY_CELL";
import DAA_HANDLER from "./opcodes/MISCELLANEOUS/DAA";
import JMP_RELATIVE_IF_ZERO_FLAG_IS_SET_HANDLER from "./opcodes/JMP/JMP_RELATIVE_IF_ZERO_FLAG_IS_SET";
import ADD_HL_HL_HANDLER from "./opcodes/MATH/ADD_HL_HL";
import LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_INCREMENT_HL_AFTER_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_INCREMENT_HL_AFTER";
import DEC_HL_HANDLER from "./opcodes/MATH/DEC_HL";
import INC_L_HANDLER from "./opcodes/MATH/INC_L";
import DEC_L_HANDLER from "./opcodes/MATH/DEC_L";
import LOAD_TO_REG_L_VALUE_OF_NEXT_MEMORY_CELL_HANDLER from "./opcodes/LOAD/LOAD_TO_REG_L_VALUE_FROM_NEXT_MEMORY_CELL";
import CPL_HANDLER from "./opcodes/MISCELLANEOUS/CPL";

import { IJumpTable } from "./types";

const JUMP_TABLE: IJumpTable = {
    [NON_PREFIX_OP_CODES.NOOP]: NOOP_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS]:  LOAD_TO_REG_BC_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER]: LOAD_TO_MEMORY_CELL_FROM_BC_REGISTER_VALUE_OF_A_REGISTER_HANDLER,
    [NON_PREFIX_OP_CODES.INC_BC]: INC_BC_HANDLER,
    [NON_PREFIX_OP_CODES.INC_B]: INC_B_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_B]: DEC_B_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_B_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_B_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.RLCA]: RLCA_NON_PREFIX_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_SP_REGISTER]: LOAD_TO_MEMORY_CELL_COMBINED_FROM_TWO_NEXT_MEMORY_CELL_VALUE_OF_SP_REGISTER_HANDLER,
    [NON_PREFIX_OP_CODES.ADD_HL_BC]: ADD_HL_BC_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER]: LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_BC_REGISTER_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_BC]: DEC_BC_HANDLER,
    [NON_PREFIX_OP_CODES.INC_C]: INC_C_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_C]: DEC_C_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_C_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_C_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.RRCA]: RRCA_NON_PREIFX_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS]: LOAD_TO_REG_DE_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER]: LOAD_TO_MEMORY_CELL_FROM_DE_REGISTER_VALUE_OF_A_REGISTER_HANDLER,
    [NON_PREFIX_OP_CODES.INC_DE]: INC_DE_HANDLER,
    [NON_PREFIX_OP_CODES.INC_D]: INC_D_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_D]: DEC_D_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_D_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_D_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.RLA]: RLA_NON_PREFIX_HANDLER,
    [NON_PREFIX_OP_CODES.JMP_RELATIVE]: JMP_RELATIVE_HANDLER,
    [NON_PREFIX_OP_CODES.ADD_HL_DE]: ADD_HL_DE_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER]: LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_DE_REGISTER_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_DE]: DEC_DE_HANDLER,
    [NON_PREFIX_OP_CODES.INC_E]: INC_E_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_E]: DEC_E_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_E_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_E_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.RRA]: RRA_NON_PREFIX_HANDLER,
    [NON_PREFIX_OP_CODES.JMP_RELATIVE_IF_ZERO_FLAG_IS_NOT_SET]: JMP_RELATIVE_IF_ZERO_FLAG_IS_NOT_SET_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS]: LOAD_TO_REG_HL_A_VALUE_OF_NEXT_TWO_MEMORY_CELLS_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER]: LOAD_TO_MEMORY_CELL_FROM_HL_REGISTER_VALUE_OF_A_REGISTER_INCREMENT_HL_AFTER_HANDLER,
    [NON_PREFIX_OP_CODES.INC_HL]: INC_HL_HANDLER,
    [NON_PREFIX_OP_CODES.INC_H]: INC_H_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_H]: DEC_H_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_H_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_H_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.DAA]: DAA_HANDLER,
    [NON_PREFIX_OP_CODES.JMP_RELATIVE_IF_ZERO_FLAG_IS_SET]: JMP_RELATIVE_IF_ZERO_FLAG_IS_SET_HANDLER,
    [NON_PREFIX_OP_CODES.ADD_HL_HL]: ADD_HL_HL_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_INCREMENT_HL_AFTER]: LOAD_TO_REG_A_VALUE_OF_MEMORY_CELL_FROM_HL_REGISTER_INCREMENT_HL_AFTER_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_HL]: DEC_HL_HANDLER,
    [NON_PREFIX_OP_CODES.INC_L]: INC_L_HANDLER,
    [NON_PREFIX_OP_CODES.DEC_L]: DEC_L_HANDLER,
    [NON_PREFIX_OP_CODES.LOAD_TO_REG_L_VALUE_OF_NEXT_MEMORY_CELL]: LOAD_TO_REG_L_VALUE_OF_NEXT_MEMORY_CELL_HANDLER,
    [NON_PREFIX_OP_CODES.CPL]: CPL_HANDLER
};

export default JUMP_TABLE;