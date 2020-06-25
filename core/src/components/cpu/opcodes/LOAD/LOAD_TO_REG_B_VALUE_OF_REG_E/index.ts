import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x43
  Memonic: LD B, E
  Description: Loads to register B value currently holded in register E
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterEValue();
    payload.CPU.setRegisterBValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;