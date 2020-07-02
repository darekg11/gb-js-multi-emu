import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x2E
  Memonic: SRAHL
  Description: Shifts value from memory index under register HL by 1 bit to the right.
  Carry flag is set to value of bit 0 value from memory index of register HL.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 value from memory index of register HL.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const memoryValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterHLValue());
    const memoryValueZerobitValue = memoryValue & 1;
    if (memoryValueZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const newMemoryValue = ((memoryValue & 0x80) | (memoryValue >> 1)) & 0xFF;
    payload.Memory.write8BitsValue(payload.CPU.getRegisterHLValue(), newMemoryValue);
    if (newMemoryValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 16;
}

export default handle;