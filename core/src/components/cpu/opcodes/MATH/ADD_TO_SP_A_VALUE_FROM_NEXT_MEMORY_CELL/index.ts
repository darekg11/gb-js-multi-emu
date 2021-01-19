import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE8
  Memonic: ADD SP, n
  Description: Adds to register SP a value from next memory cell (PC++).
    Sets SUBTRACTION flag to 0
    Sets CARRY flag if we overflow 255 value
    Sets ZERO flag to 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerSPValue = payload.CPU.getRegisterSPValue();
    const programCounter = payload.CPU.getProgramCounter();
    const nextMemoryValue = payload.Memory.read8BitsValue(programCounter + 1);
    const signedMemoryValue = nextMemoryValue > 127 ? -((~nextMemoryValue + 1) & 255) : nextMemoryValue;
    const sum = registerSPValue + signedMemoryValue;
    const bitwise = (registerSPValue ^ signedMemoryValue ^ sum);
    const wrappedValue = sum & 0xFFFF;
    if ((bitwise & 256) !== 0) {
      payload.CPU.setCarryFlag();
    } else {
      payload.CPU.unsetCarryFlag();
    }
    const shouldSetHalfCarryFlag = (bitwise & 0x10) !== 0;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    } else {
        payload.CPU.unsetHalfCarryFlag();
    }
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setRegisterSPValue(wrappedValue);
    payload.CPU.increaseProgramCounter(2);
    return 16;
}

export default handle;