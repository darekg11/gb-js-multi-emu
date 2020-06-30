import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xEE
  Memonic: XOR n
  Description: Bitwise XOR of A register value and next memory cell (PC+) - store result in register A.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag to 0
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const registerAValue = payload.CPU.getRegisterAValue();
    const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const value = registerAValue ^ memoryValue;
    const safeValue = value & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.setRegisterAValue(safeValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;