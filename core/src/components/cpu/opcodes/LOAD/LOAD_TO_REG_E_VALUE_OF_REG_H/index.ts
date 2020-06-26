import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x5C
  Memonic: LD E, H
  Description: Loads to register E value currently holded in register H
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterHValue();
    payload.CPU.setRegisterEValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;