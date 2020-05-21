import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x22
  Memonic: SLAD
  Description: Shifts register D by 1 bit to the left.
  Carry flag is set to value of bit 7 of register D.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register D.
    Sets ZERO flag is set if result value is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    if (payload.CPU.getRegisterDValue() > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterDValue((payload.CPU.getRegisterDValue() << 1 & 0xFF));
    if (payload.CPU.getRegisterDValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;