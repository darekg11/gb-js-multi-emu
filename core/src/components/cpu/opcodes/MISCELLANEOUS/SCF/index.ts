import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x37
  Memonic: SCF
  Description: Sets the carry flag, and clears the N and H flags.
  Size: 1 Byte - increments PC by 1
  Cycles: 1
  Flags affected:
    ZERO Flag: Not affected
    SUB Flag: 0
    HALF CARRY Flag: 0
    CARRY Flag: 1

*/
const handle = (payload: IOpCodeHanlePayload) => {
    payload.CPU.setCarryFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.increaseProgramCounter(1);
}

export default handle;