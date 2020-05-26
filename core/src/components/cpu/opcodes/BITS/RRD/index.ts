import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x1A
  Memonic: RRD
  Description: Shifts register D by 1 bit to the right.
  Carry flag is set to value of bit 0 of register D.
  Zero flag is set if result is 0
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register D.
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const newCarryFlag = (payload.CPU.getRegisterDValue() & 0x01) === 1;
    payload.CPU.setRegisterDValue((payload.CPU.isCarryFlagSet() ? 0x80 : 0) | (payload.CPU.getRegisterDValue() >> 1) & 0xFF);
    if (newCarryFlag) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
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