import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x56
  Memonic: BIT 2 (HL)
  Description: Sets zero flag if bit 2 (third to the right) of value under memory index from register HL is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 12
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 2 of value under memory index from register HL is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    if ((memoryValue & 0x04) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 12;
}

export default handle;