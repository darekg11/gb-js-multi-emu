import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x21
  Memonic: SLAC
  Description: Shifts register C by 1 bit to the left.
  Carry flag is set to value of bit 7 of register C.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 7 of register C.
    Sets ZERO flag is set if result value is 0
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    if (payload.CPU.getRegisterCValue() > 0x7F) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterCValue((payload.CPU.getRegisterCValue() << 1 & 0xFF));
    if (payload.CPU.getRegisterCValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;