import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x23
  Memonic: SLAE
  Description: Shifts register E by 1 bit to the left.
  Carry flag is set to value of bit 7 of register E.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register E.
    Sets ZERO flag is set if result value is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    if (payload.CPU.getRegisterEValue() > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterEValue((payload.CPU.getRegisterEValue() << 1 & 0xFF));
    if (payload.CPU.getRegisterEValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;