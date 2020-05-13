import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x1F
  Memonic: RRA
  Description: Shifts register A by 1 bit to the right.
  Carry flag is set to value of bit 0 of register A.
  The previous contents of the Carry flag are copied to bit 7 (ZERO FLAG)
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register A.
    Sets ZERO flag to value of previous CARRY flag
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const carryFlag = payload.CPU.isCarryFlagSet() ? 0x80 : 0;
    if ((payload.CPU.getRegisterAValue() & 1) === 1) {
        payload.CPU.setCarryFlag()
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() >> 1 & 0xFF) | carryFlag);
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter();
}

export default handle;