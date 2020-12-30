import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xDE
  Memonic: SBC A, n
  Description: Subtracts from register A a value of next memory cell (PC++). Subtracts carry flag value from register A.
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 2 Byte - increments PC by 2
  Cycles: 8
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const registerAValue = payload.CPU.getRegisterAValue();
    const value = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    const diff = registerAValue - value - (isCarryFlagSet ? 1 : 0)
    if ((diff & 256) !== 0) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const wrappedValue = diff & 255;
    if (wrappedValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    const shouldSetHalfCarryFlag = ((registerAValue ^ value ^ diff) & 0x10) !== 0;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.setRegisterAValue(wrappedValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;