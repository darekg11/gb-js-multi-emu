import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x2D
  Memonic: DEC L
  Description: Decreases value stored in L register.
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerLValue = payload.CPU.getRegisterLValue();
    const decremented = registerLValue - 1;
    const safeValue = decremented & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    const shouldSetHalfCarryFlag = (registerLValue & 0xF) === 0;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.setRegisterLValue(safeValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;