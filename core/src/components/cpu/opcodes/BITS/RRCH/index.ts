import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0C
  Memonic: RRCH
  Description: Shifts register H by 1 bit to the right.
  Carry flag is set to value of bit 0 of register H.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register H.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHZerobitValue = payload.CPU.getRegisterHValue() & 1;
    if (registerHZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterHValue(((payload.CPU.isCarryFlagSet() ? 0x80 : 0) | (payload.CPU.getRegisterHValue() >> 1)) & 255);
    if (payload.CPU.getRegisterHValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;