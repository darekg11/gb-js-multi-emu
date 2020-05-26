import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x30
  Memonic: SWAP B
  Description: Swap nibbles of register B.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Sets CARRY flag to 0.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerBValue = payload.CPU.getRegisterBValue();
    const newValue = ((registerBValue & 0x0F) << 4) | ((registerBValue & 0xF0) >> 4);
    payload.CPU.setRegisterBValue(newValue);
    if (newValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;