import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x26
  Memonic: SLAHL
  Description: Shifts value from memory index of register HL by 1 bit to the left.
  Carry flag is set to value of bit 7 value from memory index of register HL.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 value from memory index of register HL.
    Sets ZERO flag is set if result value is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryValue = payload.Memory.read16BitsValue(payload.CPU.getRegisterHLValue());
    if (memoryValue > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const newMemoryValue = (memoryValue << 1) & 0xFFFF;
    payload.Memory.write16BitsValue(payload.CPU.getRegisterHLValue(), newMemoryValue);
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