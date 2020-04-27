import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE6
  Memonic: AND (n)
  Description: Bitwise AND of A register value from next memory cell (PC++) - store result in register A.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag to 0
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 1
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const programCounter = payload.CPU.getProgramCounter();
    const memoryValue = payload.Memory.read8BitsValue(programCounter + 1);
    const value = registerAValue & memoryValue;
    const safeValue = value & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.setRegisterAValue(safeValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;