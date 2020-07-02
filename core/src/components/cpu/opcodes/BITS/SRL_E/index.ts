import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x3B
  Memonic: SRL E
  Description: Shifts register E by 1 bit to the right.
  Carry flag is set to value of bit 0 of register E.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register E.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerEZerobitValue = payload.CPU.getRegisterEValue() & 1;
    if (registerEZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterEValue((payload.CPU.getRegisterEValue() >> 1) & 255);
    if (payload.CPU.getRegisterEValue() === 0) {
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