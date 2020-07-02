import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x39
  Memonic: SRL C
  Description: Shifts register C by 1 bit to the right.
  Carry flag is set to value of bit 0 of register C.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0
    Sets CARRY flag is set to value of bit 0 of register C.
    Sets ZERO flag to 0 if result is 0.
    Sets HALF_CARRY flag to 0

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerCZerobitValue = payload.CPU.getRegisterCValue() & 1;
    if (registerCZerobitValue === 1) {
        payload.CPU.setCarryFlag();
    } else {
        payload.CPU.unsetCarryFlag();
    }
    payload.CPU.setRegisterCValue((payload.CPU.getRegisterCValue() >> 1) & 255);
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