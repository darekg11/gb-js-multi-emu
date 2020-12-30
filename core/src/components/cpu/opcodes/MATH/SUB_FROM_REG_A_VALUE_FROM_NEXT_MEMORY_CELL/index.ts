import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD6
  Memonic: SUB A, (n)
  Description: Subtracts from register A a value of next memory cell (PC++).
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 2 Byte - increments PC by 2
  Cycles: 8
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const programCounter = payload.CPU.getProgramCounter();
    const nextMemoryValue = payload.Memory.read8BitsValue(programCounter + 1);
    const diff = registerAValue - nextMemoryValue;
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
    const shouldSetHalfCarryFlag = ((registerAValue ^ nextMemoryValue ^ diff) & 0x10) !== 0;
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