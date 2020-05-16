import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x00
  Memonic: RLCB
  Description: Shifts register B by 1 bit to the left.
  Carry flag is set to value of bit 7 of register B.
  Zero flag is set if result is 0
  Size: 2 Byte - increments PC by 2
  Cycles: 4
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register B.
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    if (payload.CPU.getRegisterBValue() > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterBValue((payload.CPU.getRegisterBValue() << 1 & 0xFF) | (payload.CPU.isCarryFlagSet() ? 1 : 0));
    if (payload.CPU.getRegisterBValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;