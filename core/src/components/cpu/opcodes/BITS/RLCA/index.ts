import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x07
  Memonic: RLCA
  Description: Shifts register A by 1 bit to the left.
  Carry flag is set to value of bit 7 of register A.
  Bit 0 of register A is set to value of bit 7 (ZERO FLAG) of regi
  The previous contents of the Carry flag are copied to bit 0
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register A.
    Sets ZERO flag to 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    if (payload.CPU.getRegisterAValue() > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    // >> 7 shifts 7 bit position to the 0 bit so it can be OR easily
    payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() << 1 & 0xFF) | (payload.CPU.getRegisterAValue() >> 7));
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter();
}

export default handle;