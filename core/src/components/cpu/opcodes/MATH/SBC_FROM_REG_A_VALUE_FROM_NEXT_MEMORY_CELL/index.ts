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
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const registerAValue = payload.CPU.getRegisterAValue();
    const value = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    const diff = registerAValue - value - (isCarryFlagSet ? 1 : 0)
    if (diff < 0) {
        payload.CPU.setCarryFlag();
    }
    const wrappedValue = diff & 255;
    if (wrappedValue === 0) {
        payload.CPU.setZeroFlag();
    }
    const shouldSetHalfCarryFlag = (registerAValue & 0xF) + (value & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.setRegisterAValue(wrappedValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;