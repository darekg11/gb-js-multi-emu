import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x3E
  Memonic: SRL (HL)
  Description: Shifts register L by 1 bit to the right.
  Carry flag is set to value of bit 0 of register L.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register L.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    const memoryValueZeroBit = memoryValue & 1;
    if (memoryValueZeroBit === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const newMemoryValue = (memoryValue >> 1) & 255;
    payload.Memory.write8BitsValue(memoryIndex, newMemoryValue);
    if (newMemoryValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;