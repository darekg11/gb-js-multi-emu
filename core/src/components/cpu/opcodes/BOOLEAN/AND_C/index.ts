import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xA1
  Memonic: AND C
  Description: Bitwise AND of A register value and C register value - store result in register A.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag to 0
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 1
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const registerCValue = payload.CPU.getRegisterCValue();
    const value = registerAValue & registerCValue;
    const safeValue = value & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.setRegisterAValue(safeValue);
    payload.CPU.increaseProgramCounter();
    return 4;
}

export default handle;