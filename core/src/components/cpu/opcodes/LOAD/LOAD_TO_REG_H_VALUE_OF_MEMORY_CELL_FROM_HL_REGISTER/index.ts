import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x66
  Memonic: LD H, (HL)
  Description: Loads to register H value (1 byte === 8 bits) from memory location under index from HL register
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const valueOfHLRegister = payload.CPU.getRegisterHLValue();
    const value = payload.Memory.read8BitsValue(valueOfHLRegister);
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 8;
}

export default handle;