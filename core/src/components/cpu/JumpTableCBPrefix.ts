import { CB_OP_CODES } from "./opcodes/OP_CODES_ENUM";

import RLCB_HANDLER from "./opcodes/BITS/RLCB";
import RLCC_HANDLER from "./opcodes/BITS/RLCC";
import RLCD_HANDLER from "./opcodes/BITS/RLCD";
import RLCE_HANDLER from "./opcodes/BITS/RLCE";
import RLCH_HANDLER from "./opcodes/BITS/RLCH";
import RLCL_HANDLER from "./opcodes/BITS/RLCL";
import RLCHL_HANDLER from "./opcodes/BITS/RLCHL";
import RLCA_CB_PREFIX_HANDLER from "./opcodes/BITS/RLCA_CB";
import RRCB_HANDLER from "./opcodes/BITS/RRCB";
import RRCC_HANDLER from "./opcodes/BITS/RRCC";
import RRCD_HANDLER from "./opcodes/BITS/RRCD";
import RRCE_HANDLER from "./opcodes/BITS/RRCE";
import RRCH_HANDLER from "./opcodes/BITS/RRCH";
import RRCL_HANDLER from "./opcodes/BITS/RRCL";
import RRCHL_HANDLER from "./opcodes/BITS/RRCHL";
import RRCA_CB_PREFIX_HANDLER from "./opcodes/BITS/RRCA_CB";
import RLB_HANDLER from "./opcodes/BITS/RLB";
import RLC_HANDLER from "./opcodes/BITS/RLC";
import RLD_HANDLER from "./opcodes/BITS/RLD";
import RLE_HANDLER from "./opcodes/BITS/RLE";
import RLH_HANDLER from "./opcodes/BITS/RLH";
import RLL_HANDLER from "./opcodes/BITS/RLL";
import RLHL_HANDLER from "./opcodes/BITS/RLHL";
import RLA_CB_PREFIX_HANDLER from "./opcodes/BITS/RLA_CB";
import RRB_HANDLER from "./opcodes/BITS/RRB";
import RRC_HANDLER from "./opcodes/BITS/RRC";
import RRD_HANDLER from "./opcodes/BITS/RRD";
import RRE_HANDLER from "./opcodes/BITS/RRE";
import RRH_HANDLER from "./opcodes/BITS/RRH";
import RRL_HANDLER from "./opcodes/BITS/RRL";
import RRHL_HANDLER from "./opcodes/BITS/RRHL";
import RRA_CB_PREFIX_HANDLER from "./opcodes/BITS/RRA_CB";
import SLAB_HANDLER from "./opcodes/BITS/SLAB";
import SLAC_HANDLER from "./opcodes/BITS/SLAC";
import SLAD_HANDLER from "./opcodes/BITS/SLAD";
import SLAE_HANDLER from "./opcodes/BITS/SLAE";
import SLAH_HANDLER from "./opcodes/BITS/SLAH";
import SLAL_HANDLER from "./opcodes/BITS/SLAL";
import SLAHL_HANDLER from "./opcodes/BITS/SLAHL";
import SLAA_HANDLER from "./opcodes/BITS/SLAA";
import SRAB_HANDLER from "./opcodes/BITS/SRAB";
import SRAC_HANDLER from "./opcodes/BITS/SRAC";
import SRAD_HANDLER from "./opcodes/BITS/SRAD";
import SRAE_HANDLER from "./opcodes/BITS/SRAE";
import SRAH_HANDLER from "./opcodes/BITS/SRAH";
import SRAL_HANDLER from "./opcodes/BITS/SRAL";
import SRAHL_HANDLER from "./opcodes/BITS/SRAHL";
import SRAA_HANDLER from "./opcodes/BITS/SRAA";
import SWAP_B_HANDLER from "./opcodes/BITS/SWAP_B";
import SWAP_C_HANDLER from "./opcodes/BITS/SWAP_C";
import SWAP_D_HANDLER from "./opcodes/BITS/SWAP_D";
import SWAP_E_HANDLER from "./opcodes/BITS/SWAP_E";
import SWAP_H_HANDLER from "./opcodes/BITS/SWAP_H";
import SWAP_L_HANDLER from "./opcodes/BITS/SWAP_L";
import SWAP_HL_HANDLER from "./opcodes/BITS/SWAP_HL";
import SWAP_A_HANDLER from "./opcodes/BITS/SWAP_A";
import SRLB_HANDLER from "./opcodes/BITS/SRL_B";
import SRLC_HANDLER from "./opcodes/BITS/SRL_C";
import SRLD_HANDLER from "./opcodes/BITS/SRL_D";
import SRLE_HANDLER from "./opcodes/BITS/SRL_E";
import SRLH_HANDLER from "./opcodes/BITS/SRL_H";
import SRLL_HANDLER from "./opcodes/BITS/SRL_L";
import SRLHL_HANDLER from "./opcodes/BITS/SRL_HL";
import SRLA_HANDLER from "./opcodes/BITS/SRL_A";
import BIT_0_B_HANDLER from "./opcodes/BITS/BIT_0_B";
import BIT_0_C_HANDLER from "./opcodes/BITS/BIT_0_C";
import BIT_0_D_HANDLER from "./opcodes/BITS/BIT_0_D";
import BIT_0_E_HANDLER from "./opcodes/BITS/BIT_0_E";
import BIT_0_H_HANDLER from "./opcodes/BITS/BIT_0_H";
import BIT_0_L_HANDLER from "./opcodes/BITS/BIT_0_L";
import BIT_0_HL_HANDLER from "./opcodes/BITS/BIT_0_HL";
import BIT_0_A_HANDLER from "./opcodes/BITS/BIT_0_A";
import BIT_1_B_HANDLER from "./opcodes/BITS/BIT_1_B";
import BIT_1_C_HANDLER from "./opcodes/BITS/BIT_1_C";
import BIT_1_D_HANDLER from "./opcodes/BITS/BIT_1_D";
import BIT_1_E_HANDLER from "./opcodes/BITS/BIT_1_E";
import BIT_1_H_HANDLER from "./opcodes/BITS/BIT_1_H";
import BIT_1_L_HANDLER from "./opcodes/BITS/BIT_1_L";
import BIT_1_HL_HANDLER from "./opcodes/BITS/BIT_1_HL";
import BIT_1_A_HANDLER from "./opcodes/BITS/BIT_1_A";
import BIT_2_B_HANDLER from "./opcodes/BITS/BIT_2_B";
import BIT_2_C_HANDLER from "./opcodes/BITS/BIT_2_C";
import BIT_2_D_HANDLER from "./opcodes/BITS/BIT_2_D";
import BIT_2_E_HANDLER from "./opcodes/BITS/BIT_2_E";
import BIT_2_H_HANDLER from "./opcodes/BITS/BIT_2_H";
import BIT_2_L_HANDLER from "./opcodes/BITS/BIT_2_L";
import BIT_2_HL_HANDLER from "./opcodes/BITS/BIT_2_HL";
import BIT_2_A_HANDLER from "./opcodes/BITS/BIT_2_A";
import BIT_3_B_HANDLER from "./opcodes/BITS/BIT_3_B";
import BIT_3_C_HANDLER from "./opcodes/BITS/BIT_3_C";
import BIT_3_D_HANDLER from "./opcodes/BITS/BIT_3_D";
import BIT_3_E_HANDLER from "./opcodes/BITS/BIT_3_E";
import BIT_3_H_HANDLER from "./opcodes/BITS/BIT_3_H";
import BIT_3_L_HANDLER from "./opcodes/BITS/BIT_3_L";
import BIT_3_HL_HANDLER from "./opcodes/BITS/BIT_3_HL";
import BIT_3_A_HANDLER from "./opcodes/BITS/BIT_3_A";
import BIT_4_B_HANDLER from "./opcodes/BITS/BIT_4_B";
import BIT_4_C_HANDLER from "./opcodes/BITS/BIT_4_C";
import BIT_4_D_HANDLER from "./opcodes/BITS/BIT_4_D";
import BIT_4_E_HANDLER from "./opcodes/BITS/BIT_4_E";
import BIT_4_H_HANDLER from "./opcodes/BITS/BIT_4_H";
import BIT_4_L_HANDLER from "./opcodes/BITS/BIT_4_L";
import BIT_4_HL_HANDLER from "./opcodes/BITS/BIT_4_HL";
import BIT_4_A_HANDLER from "./opcodes/BITS/BIT_4_A";
import BIT_5_B_HANDLER from "./opcodes/BITS/BIT_5_B";
import BIT_5_C_HANDLER from "./opcodes/BITS/BIT_5_C";
import BIT_5_D_HANDLER from "./opcodes/BITS/BIT_5_D";
import BIT_5_E_HANDLER from "./opcodes/BITS/BIT_5_E";
import BIT_5_H_HANDLER from "./opcodes/BITS/BIT_5_H";
import BIT_5_L_HANDLER from "./opcodes/BITS/BIT_5_L";
import BIT_5_HL_HANDLER from "./opcodes/BITS/BIT_5_HL";
import BIT_5_A_HANDLER from "./opcodes/BITS/BIT_5_A";
import BIT_6_B_HANDLER from "./opcodes/BITS/BIT_6_B";
import BIT_6_C_HANDLER from "./opcodes/BITS/BIT_6_C";
import BIT_6_D_HANDLER from "./opcodes/BITS/BIT_6_D";
import BIT_6_E_HANDLER from "./opcodes/BITS/BIT_6_E";
import BIT_6_H_HANDLER from "./opcodes/BITS/BIT_6_H";
import BIT_6_L_HANDLER from "./opcodes/BITS/BIT_6_L";
import BIT_6_HL_HANDLER from "./opcodes/BITS/BIT_6_HL";
import BIT_6_A_HANDLER from "./opcodes/BITS/BIT_6_A";
import BIT_7_B_HANDLER from "./opcodes/BITS/BIT_7_B";
import BIT_7_C_HANDLER from "./opcodes/BITS/BIT_7_C";
import BIT_7_D_HANDLER from "./opcodes/BITS/BIT_7_D";
import BIT_7_E_HANDLER from "./opcodes/BITS/BIT_7_E";
import BIT_7_H_HANDLER from "./opcodes/BITS/BIT_7_H";
import BIT_7_L_HANDLER from "./opcodes/BITS/BIT_7_L";
import BIT_7_HL_HANDLER from "./opcodes/BITS/BIT_7_HL";
import BIT_7_A_HANDLER from "./opcodes/BITS/BIT_7_A";
import { IJumpTable } from "./types";

const JUMP_TABLE: IJumpTable = {
    [CB_OP_CODES.RLCB]: RLCB_HANDLER,
    [CB_OP_CODES.RLCC]: RLCC_HANDLER,
    [CB_OP_CODES.RLCD]: RLCD_HANDLER,
    [CB_OP_CODES.RLCE]: RLCE_HANDLER,
    [CB_OP_CODES.RLCH]: RLCH_HANDLER,
    [CB_OP_CODES.RLCL]: RLCL_HANDLER,
    [CB_OP_CODES.RLCHL]: RLCHL_HANDLER,
    [CB_OP_CODES.RLCA]: RLCA_CB_PREFIX_HANDLER,
    [CB_OP_CODES.RRCB]: RRCB_HANDLER,
    [CB_OP_CODES.RRCC]: RRCC_HANDLER,
    [CB_OP_CODES.RRCD]: RRCD_HANDLER,
    [CB_OP_CODES.RRCE]: RRCE_HANDLER,
    [CB_OP_CODES.RRCH]: RRCH_HANDLER,
    [CB_OP_CODES.RRCL]: RRCL_HANDLER,
    [CB_OP_CODES.RRCHL]: RRCHL_HANDLER,
    [CB_OP_CODES.RRCA]: RRCA_CB_PREFIX_HANDLER,
    [CB_OP_CODES.RLB]: RLB_HANDLER,
    [CB_OP_CODES.RLC]: RLC_HANDLER,
    [CB_OP_CODES.RLD]: RLD_HANDLER,
    [CB_OP_CODES.RLE]: RLE_HANDLER,
    [CB_OP_CODES.RLH]: RLH_HANDLER,
    [CB_OP_CODES.RLL]: RLL_HANDLER,
    [CB_OP_CODES.RLHL]: RLHL_HANDLER,
    [CB_OP_CODES.RLA]: RLA_CB_PREFIX_HANDLER,
    [CB_OP_CODES.RRB]: RRB_HANDLER,
    [CB_OP_CODES.RRC]: RRC_HANDLER,
    [CB_OP_CODES.RRD]: RRD_HANDLER,
    [CB_OP_CODES.RRE]: RRE_HANDLER,
    [CB_OP_CODES.RRH]: RRH_HANDLER,
    [CB_OP_CODES.RRL]: RRL_HANDLER,
    [CB_OP_CODES.RRHL]: RRHL_HANDLER,
    [CB_OP_CODES.RRA]: RRA_CB_PREFIX_HANDLER,
    [CB_OP_CODES.SLAB]: SLAB_HANDLER,
    [CB_OP_CODES.SLAC]: SLAC_HANDLER,
    [CB_OP_CODES.SLAD]: SLAD_HANDLER,
    [CB_OP_CODES.SLAE]: SLAE_HANDLER,
    [CB_OP_CODES.SLAH]: SLAH_HANDLER,
    [CB_OP_CODES.SLAL]: SLAL_HANDLER,
    [CB_OP_CODES.SLAHL]: SLAHL_HANDLER,
    [CB_OP_CODES.SLAA]: SLAA_HANDLER,
    [CB_OP_CODES.SRAB]: SRAB_HANDLER,
    [CB_OP_CODES.SRAC]: SRAC_HANDLER,
    [CB_OP_CODES.SRAD]: SRAD_HANDLER,
    [CB_OP_CODES.SRAE]: SRAE_HANDLER,
    [CB_OP_CODES.SRAH]: SRAH_HANDLER,
    [CB_OP_CODES.SRAL]: SRAL_HANDLER,
    [CB_OP_CODES.SRAHL]: SRAHL_HANDLER,
    [CB_OP_CODES.SRAA]: SRAA_HANDLER,
    [CB_OP_CODES.SWAP_B]: SWAP_B_HANDLER,
    [CB_OP_CODES.SWAP_C]: SWAP_C_HANDLER,
    [CB_OP_CODES.SWAP_D]: SWAP_D_HANDLER,
    [CB_OP_CODES.SWAP_E]: SWAP_E_HANDLER,
    [CB_OP_CODES.SWAP_H]: SWAP_H_HANDLER,
    [CB_OP_CODES.SWAP_L]: SWAP_L_HANDLER,
    [CB_OP_CODES.SWAP_HL]: SWAP_HL_HANDLER,
    [CB_OP_CODES.SWAP_A]: SWAP_A_HANDLER,
    [CB_OP_CODES.SRL_B]: SRLB_HANDLER,
    [CB_OP_CODES.SRL_C]: SRLC_HANDLER,
    [CB_OP_CODES.SRL_D]: SRLD_HANDLER,
    [CB_OP_CODES.SRL_E]: SRLE_HANDLER,
    [CB_OP_CODES.SRL_H]: SRLH_HANDLER,
    [CB_OP_CODES.SRL_L]: SRLL_HANDLER,
    [CB_OP_CODES.SRL_HL]: SRLHL_HANDLER,
    [CB_OP_CODES.SRL_A]: SRLA_HANDLER,
    [CB_OP_CODES.BIT_0_B]: BIT_0_B_HANDLER,
    [CB_OP_CODES.BIT_0_C]: BIT_0_C_HANDLER,
    [CB_OP_CODES.BIT_0_D]: BIT_0_D_HANDLER,
    [CB_OP_CODES.BIT_0_E]: BIT_0_E_HANDLER,
    [CB_OP_CODES.BIT_0_H]: BIT_0_H_HANDLER,
    [CB_OP_CODES.BIT_0_L]: BIT_0_L_HANDLER,
    [CB_OP_CODES.BIT_0_HL]: BIT_0_HL_HANDLER,
    [CB_OP_CODES.BIT_0_A]: BIT_0_A_HANDLER,
    [CB_OP_CODES.BIT_1_B]: BIT_1_B_HANDLER,
    [CB_OP_CODES.BIT_1_C]: BIT_1_C_HANDLER,
    [CB_OP_CODES.BIT_1_D]: BIT_1_D_HANDLER,
    [CB_OP_CODES.BIT_1_E]: BIT_1_E_HANDLER,
    [CB_OP_CODES.BIT_1_H]: BIT_1_H_HANDLER,
    [CB_OP_CODES.BIT_1_L]: BIT_1_L_HANDLER,
    [CB_OP_CODES.BIT_1_HL]: BIT_1_HL_HANDLER,
    [CB_OP_CODES.BIT_1_A]: BIT_1_A_HANDLER,
    [CB_OP_CODES.BIT_2_B]: BIT_2_B_HANDLER,
    [CB_OP_CODES.BIT_2_C]: BIT_2_C_HANDLER,
    [CB_OP_CODES.BIT_2_D]: BIT_2_D_HANDLER,
    [CB_OP_CODES.BIT_2_E]: BIT_2_E_HANDLER,
    [CB_OP_CODES.BIT_2_H]: BIT_2_H_HANDLER,
    [CB_OP_CODES.BIT_2_L]: BIT_2_L_HANDLER,
    [CB_OP_CODES.BIT_2_HL]: BIT_2_HL_HANDLER,
    [CB_OP_CODES.BIT_2_A]: BIT_2_A_HANDLER,
    [CB_OP_CODES.BIT_3_B]: BIT_3_B_HANDLER,
    [CB_OP_CODES.BIT_3_C]: BIT_3_C_HANDLER,
    [CB_OP_CODES.BIT_3_D]: BIT_3_D_HANDLER,
    [CB_OP_CODES.BIT_3_E]: BIT_3_E_HANDLER,
    [CB_OP_CODES.BIT_3_H]: BIT_3_H_HANDLER,
    [CB_OP_CODES.BIT_3_L]: BIT_3_L_HANDLER,
    [CB_OP_CODES.BIT_3_HL]: BIT_3_HL_HANDLER,
    [CB_OP_CODES.BIT_3_A]: BIT_3_A_HANDLER,
    [CB_OP_CODES.BIT_4_B]: BIT_4_B_HANDLER,
    [CB_OP_CODES.BIT_4_C]: BIT_4_C_HANDLER,
    [CB_OP_CODES.BIT_4_D]: BIT_4_D_HANDLER,
    [CB_OP_CODES.BIT_4_E]: BIT_4_E_HANDLER,
    [CB_OP_CODES.BIT_4_H]: BIT_4_H_HANDLER,
    [CB_OP_CODES.BIT_4_L]: BIT_4_L_HANDLER,
    [CB_OP_CODES.BIT_4_HL]: BIT_4_HL_HANDLER,
    [CB_OP_CODES.BIT_4_A]: BIT_4_A_HANDLER,
    [CB_OP_CODES.BIT_5_B]: BIT_5_B_HANDLER,
    [CB_OP_CODES.BIT_5_C]: BIT_5_C_HANDLER,
    [CB_OP_CODES.BIT_5_D]: BIT_5_D_HANDLER,
    [CB_OP_CODES.BIT_5_E]: BIT_5_E_HANDLER,
    [CB_OP_CODES.BIT_5_H]: BIT_5_H_HANDLER,
    [CB_OP_CODES.BIT_5_L]: BIT_5_L_HANDLER,
    [CB_OP_CODES.BIT_5_HL]: BIT_5_HL_HANDLER,
    [CB_OP_CODES.BIT_5_A]: BIT_5_A_HANDLER,
    [CB_OP_CODES.BIT_6_B]: BIT_6_B_HANDLER,
    [CB_OP_CODES.BIT_6_C]: BIT_6_C_HANDLER,
    [CB_OP_CODES.BIT_6_D]: BIT_6_D_HANDLER,
    [CB_OP_CODES.BIT_6_E]: BIT_6_E_HANDLER,
    [CB_OP_CODES.BIT_6_H]: BIT_6_H_HANDLER,
    [CB_OP_CODES.BIT_6_L]: BIT_6_L_HANDLER,
    [CB_OP_CODES.BIT_6_HL]: BIT_6_HL_HANDLER,
    [CB_OP_CODES.BIT_6_A]: BIT_6_A_HANDLER,
    [CB_OP_CODES.BIT_7_B]: BIT_7_B_HANDLER,
    [CB_OP_CODES.BIT_7_C]: BIT_7_C_HANDLER,
    [CB_OP_CODES.BIT_7_D]: BIT_7_D_HANDLER,
    [CB_OP_CODES.BIT_7_E]: BIT_7_E_HANDLER,
    [CB_OP_CODES.BIT_7_H]: BIT_7_H_HANDLER,
    [CB_OP_CODES.BIT_7_L]: BIT_7_L_HANDLER,
    [CB_OP_CODES.BIT_7_HL]: BIT_7_HL_HANDLER,
    [CB_OP_CODES.BIT_7_A]: BIT_7_A_HANDLER,
};

export default JUMP_TABLE;