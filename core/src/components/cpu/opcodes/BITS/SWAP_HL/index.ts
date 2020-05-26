import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x36
  Memonic: SWAP (HL)
  Description: Swap nibbles of value under memory index of register HL.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Sets CARRY flag to 0.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    const newValue = ((memoryValue & 0x0F) << 4) | ((memoryValue & 0xF0) >> 4);
    payload.Memory.write8BitsValue(memoryIndex, newValue);
    if (newValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;