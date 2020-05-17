import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0E
  Memonic: RRCHL
  Description: Shifts register HL by 1 bit to the right.
  Carry flag is set to value of bit 0 of register HL.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register HL.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHLZerobitValue = payload.CPU.getRegisterHLValue() & 1;
    if (registerHLZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterHLValue(((payload.CPU.isCarryFlagSet() ? 0x80 : 0) | (payload.CPU.getRegisterHLValue() >> 1)) & 65535);
    if (payload.CPU.getRegisterHLValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;