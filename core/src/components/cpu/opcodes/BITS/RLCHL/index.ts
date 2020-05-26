import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x06
  Memonic: RLCHL
  Description: Shifts value under register HL in memory by 1 bit to the left.
  Carry flag is set to value of bit 7 from value under index from register HL.
  Zero flag is set if result is 0
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of memory value from HL memory index
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterHLValue());
    if (memoryValue > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    const newValue = (memoryValue << 1 & 0xFF) | (payload.CPU.isCarryFlagSet() ? 1 : 0);
    payload.Memory.write8BitsValue(payload.CPU.getRegisterHLValue(), newValue);
    if (newValue === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;