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
    [CB_OP_CODES.RRA]: RRA_CB_PREFIX_HANDLER
};

export default JUMP_TABLE;