import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x19
  Memonic: ADD HL DE
  Description: Adds to register HL a value of register DE.
    Sets SUBTRACTION flag to 0
    Sets CARRY flag if we overflow 65535 value
    Do not change ZERO flag state
    Sets HALF_CARRY flag if bit 3 overflows into bit 4 so whenever there is overflow to upper nibble
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHLValue = payload.CPU.getRegisterHLValue();
    const registerDEValue = payload.CPU.getRegisterDEValue();
    const sum = registerHLValue + registerDEValue;
    if (sum > 65535) {
        payload.CPU.setCarryFlag();
    }
    const wrappedValue = sum & 65535;
    const shouldSetHalfCarryFlag = (registerHLValue & 0xF) + (registerDEValue & 0xF) > 0xF;
    if (shouldSetHalfCarryFlag) {
        payload.CPU.setHalfCarryFlag();
    }
    payload.CPU.unsetSubtractionFlag();
    payload.CPU.setRegisterHLValue(wrappedValue);
    payload.CPU.increaseProgramCounter();
    return 8;
}

export default handle;