import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x89
  Memonic: ADC A, C
  Description: Adds to register A a value of register C. Adds carry flag value to register A.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag if we overflow 255 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const registerCValue = payload.CPU.getRegisterCValue();
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    const sum = registerAValue + registerCValue + (isCarryFlagSet ? 1 : 0);
    if ((sum & 256) !== 0) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const wrappedValue = sum & 255;
    if (wrappedValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    const shouldSetHalfCarryFlag = ((registerAValue ^ registerCValue ^ sum) & 0x10) !== 0;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setRegisterAValue(wrappedValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;