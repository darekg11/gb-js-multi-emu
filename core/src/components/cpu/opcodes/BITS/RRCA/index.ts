import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0F
  Memonic: RRCA
  Description: Shifts register A by 1 bit to the right.
  Carry flag is set to value of bit 0 of register A.
  Bit 7 of register A is set to value of bit 0 of register A.
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register A.
    Sets ZERO flag to 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAZerobitValue = payload.CPU.getRegisterAValue() & 1;
    if (registerAZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    // << 7 shifts 0 bit position to the 7 bit so it can be OR easily
    payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() >> 1 & 0xFF) | (registerAZerobitValue << 7));
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;