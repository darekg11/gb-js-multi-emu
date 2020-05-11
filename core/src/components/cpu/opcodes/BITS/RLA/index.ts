import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x17
  Memonic: RLA
  Description: Shifts register A by 1 bit to the left.
  Carry flag is set to value of bit 7 (ZERO FLAG) of register A.
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
    const carryFlag = payload.CPU.isCarryFlagSet() ? 1 : 0;
    if (payload.CPU.isZeroFlagSet()) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() << 1 & 0xFF) | carryFlag);
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter();
}

export default handle;