import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x37
  Memonic: SWAP A
  Description: Swap nibbles of register A.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Sets CARRY flag to 0.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0.

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const newValue = ((registerAValue & 0x0F) << 4) | ((registerAValue & 0xF0) >> 4);
    payload.CPU.setRegisterAValue(newValue);
    if (newValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;