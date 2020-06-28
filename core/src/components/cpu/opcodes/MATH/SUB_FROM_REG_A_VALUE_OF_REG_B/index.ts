import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x90
  Memonic: SUB A, B
  Description: Subtracts from register A a value of register B
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const registerBValue = payload.CPU.getRegisterBValue();
    const diff = registerAValue - registerBValue;
    if (diff < 0) {
        payload.CPU.setCarryFlag();
    }
    const wrappedValue = diff & 255;
    if (wrappedValue === 0) {
        payload.CPU.setZeroFlag();
    }
    const shouldSetHalfCarryFlag = (registerAValue & 0xF) + (registerBValue & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.setRegisterAValue(wrappedValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;