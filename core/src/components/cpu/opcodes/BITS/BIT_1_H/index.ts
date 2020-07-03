import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4C
  Memonic: BIT 1 H
  Description: Sets zero flag if bit 1 (top right) of register H is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 1 of register H is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHValue = payload.CPU.getRegisterHValue();
    if ((registerHValue & 0x02) === 0) {
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