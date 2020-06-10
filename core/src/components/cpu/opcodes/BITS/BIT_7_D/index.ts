import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x7A
  Memonic: BIT 7 D
  Description: Sets zero flag if bit 7 (first to the left) of register D is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 7 of register D is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerDValue = payload.CPU.getRegisterDValue();
    if ((registerDValue & 0x80) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;