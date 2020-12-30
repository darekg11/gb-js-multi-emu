import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xBA
  Memonic: CP D
  Description: Subtracts from register A a value of register C and sets ZERO Flag. Result is not stored, this is used for comaprision if two values are equal
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
    const registerDValue = payload.CPU.getRegisterDValue();
    const diff = registerAValue - registerDValue;
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
    const shouldSetHalfCarryFlag = ((registerAValue ^ registerDValue ^ diff) & 0x10) !== 0;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.setSubtractionFlag();
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;