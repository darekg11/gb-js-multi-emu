import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0C
  Memonic: INC C
  Description: Increases value stored in C register.
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 1 Byte - increments PC by 1
  Cycles: 4
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const incremented = registerCValue + 1;
    const safeValue = incremented & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    const shouldSetHalfCarryFlag = (registerCValue & 0xF) === 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setRegisterCValue(safeValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;