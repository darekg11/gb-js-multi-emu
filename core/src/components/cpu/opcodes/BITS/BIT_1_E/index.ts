import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4B
  Memonic: BIT 1 E
  Description: Sets zero flag if bit 1 (top right) of register E is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 1 of register E is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerEValue = payload.CPU.getRegisterEValue();
    if ((registerEValue & 0x02) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;