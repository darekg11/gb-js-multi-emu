import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x34
  Memonic: INC (HL)
  Description: Increases value from memory cell stored under HL Register
    Sets SUBTRACTION flag to 1
    Sets CARRY flag if we underflow 0 value
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const index = payload.CPU.getRegisterHLValue();
    const value = payload.Memory.read8BitsValue(index);
    const incremented = value + 1;
    if (incremented > 255) {
        payload.CPU.setCarryFlag();
    }
    const safeValue = incremented & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    const shouldSetHalfCarryFlag = (value & 0xF) + (1 & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.Memory.write8BitsValue(index, safeValue);
    payload.CPU.increaseProgramCounter();
    return 12;
}

export default handle;