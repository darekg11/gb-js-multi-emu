import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE8
  Memonic: ADD SP, n
  Description: Adds to register A a value from next memory cell (PC++).
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
    const sum = registerSPValue + nextMemoryValue;
    const wrappedValue = sum & 0xFFFF;
    if (sum > 255) {
        payload.CPU.setCarryFlag();
    }
    const shouldSetHalfCarryFlag = (registerSPValue & 0xF) + (nextMemoryValue & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.unsetZeroFlag();
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setRegisterSPValue(wrappedValue);
    payload.CPU.increaseProgramCounter(2);
    return 16;
}

export default handle;