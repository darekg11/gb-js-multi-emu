import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF8
  Memonic: LD HL, SP+n
  Description: Loads to register HL (16bits), value combined from SP register and next memory cell (PC++)
  Flags:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag if we overflow 255 value
    Sets ZERO flag to 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 2 Byte - increments PC by 2
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const spRegisterValue = payload.CPU.getRegisterSPValue();
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const signedMemoryValue = memoryValue > 127 ? -((~memoryValue + 1) & 255) : memoryValue;
    const sum = spRegisterValue + signedMemoryValue;
    const bitwise = (spRegisterValue ^ signedMemoryValue ^ sum);
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
    payload.CPU.setRegisterHLValue(wrappedValue);
    payload.CPU.increaseProgramCounter(2);
    return 12;
}

export default handle;