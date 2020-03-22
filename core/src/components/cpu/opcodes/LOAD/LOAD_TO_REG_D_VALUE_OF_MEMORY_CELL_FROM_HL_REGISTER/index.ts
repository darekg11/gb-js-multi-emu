import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x56
  Memonic: LD D, (HL)
  Description: Loads to register D value (1 byte === 8 bits) from memory location under index from HL register
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const valueOfHLRegister = payload.CPU.getRegisterHLValue();
    const value = payload.Memory.read8BitsValue(valueOfHLRegister);
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;