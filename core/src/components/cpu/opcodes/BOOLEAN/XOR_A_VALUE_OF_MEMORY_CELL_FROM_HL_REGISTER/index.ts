import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xAE
  Memonic: XOR (HL)
  Description: Bitwise XOR of A register value and value from memory index under HL register.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag to 0
    Sets ZERO flag if result is 0
    Sets HALF_CARRY flag to 0
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const index = payload.CPU.getRegisterHLValue();
    const value = payload.Memory.read8BitsValue(index);
    const result = registerAValue ^ value;
    const safeValue = result & 255;
    if (safeValue === 0) {
        payload.CPU.setZeroFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.unsetCarryFlag();
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.setRegisterAValue(safeValue);
    payload.CPU.increaseProgramCounter();
}

export default handle;