import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x75
  Memonic: LD (HL), L
  Description: Loads to memory cell under index retrieved from HL register a value from register L
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterLValue();
    const index = payload.CPU.getRegisterHLValue();
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(1);
    return 8;
}

export default handle;