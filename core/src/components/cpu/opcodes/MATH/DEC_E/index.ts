import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x1D
  Memonic: DEC E
  Description: Decreases value stored in E register.
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
    const registerEValue = payload.CPU.getRegisterEValue();
    const decremented = registerEValue - 1;
    if (decremented < 0) {
        payload.CPU.setCarryFlag();
    }
    const safeValue = decremented & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    const shouldSetHalfCarryFlag = (registerEValue & 0xF) + (1 & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.setRegisterEValue(safeValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;