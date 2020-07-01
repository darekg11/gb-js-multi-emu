import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0E
  Memonic: RRCHL
  Description: Shifts value under register HL in memory by 1 bit to the right.
  Carry flag is set to value of bit 0 from value under index from register HL.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 from value under index from register HL.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const memoryValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterHLValue());
    const memoryValueZeroBitValue = memoryValue & 1;
    if (memoryValueZeroBitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const newValue = ((payload.CPU.isCarryFlagSet() ? 0x80 : 0) | ( memoryValue >> 1)) & 0xFF;
    payload.Memory.write8BitsValue(payload.CPU.getRegisterHLValue(), newValue);
    if (newValue === 0) {
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