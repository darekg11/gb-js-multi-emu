import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x50
  Memonic: BIT 2 B
  Description: Sets zero flag if bit 2 (third to the top right) of register B is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 2 of register B is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerBValue = payload.CPU.getRegisterBValue();
    if ((registerBValue & 0x04) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;