import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x3F
  Memonic: CCF
  Description: Flips the carry flag, and clears the N and H flags.
  Size: 1 Byte - increments PC by 1
  Cycles: 1
  Flags affected:
    ZERO Flag: Not affected
    SUB Flag: 0
    HALF CARRY Flag: 0
    CARRY Flag: Flips

*/
const handle = (payload: IOpCodeHanlePayload) => {
    if (payload.CPU.isCarryFlagSet()) {
        payload.CPU.unsetCarryFlag();
    } else {
        payload.CPU.setCarryFlag();
    }
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.increaseProgramCounter(1);
}

export default handle;