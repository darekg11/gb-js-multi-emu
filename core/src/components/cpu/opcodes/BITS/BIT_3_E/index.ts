import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x5B
  Memonic: BIT 3 E
  Description: Sets zero flag if bit 3 (fourth to the top right) of register E is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 3 of register E is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerEValue = payload.CPU.getRegisterEValue();
    if ((registerEValue & 0x08) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;