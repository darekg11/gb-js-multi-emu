import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x18
  Memonic: RRB
  Description: Shifts register B by 1 bit to the right.
  Carry flag is set to value of bit 0 of register B.
  Zero flag is set if result is 0
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register B.
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const newCarryFlag = (payload.CPU.getRegisterBValue() & 0x01) === 1;
    payload.CPU.setRegisterBValue((payload.CPU.isCarryFlagSet() ? 0x80 : 0) | (payload.CPU.getRegisterBValue() >> 1) & 0xFF);
    if (newCarryFlag) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    if (payload.CPU.getRegisterBValue() === 0) {
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