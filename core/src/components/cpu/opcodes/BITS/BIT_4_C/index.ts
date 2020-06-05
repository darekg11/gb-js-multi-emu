import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x61
  Memonic: BIT 4 C
  Description: Sets zero flag if bit 4 (fifth to the top right) of register C is set to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    Sets SUBTRACTION flag to 0.
    Carry flag is unchanged.
    Sets ZERO flag to 1 if bit 4 of register C is 0.
    Sets HALF_CARRY flag to 1.

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerCValue = payload.CPU.getRegisterCValue();
    if ((registerCValue & 0x10) === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.increaseProgramCounter(2);
}

export default handle;