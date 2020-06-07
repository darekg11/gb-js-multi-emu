import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x75
  Memonic: BIT 6 L
  Description: Sets zero flag if bit 6 (seventh to the right) of register L is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 6 of register L is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerLValue = payload.CPU.getRegisterLValue();
    if ((registerLValue & 0x40) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;