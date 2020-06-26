import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x59
  Memonic: LD E, C
  Description: Loads to register E value currently holded in register C
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterCValue();
    payload.CPU.setRegisterEValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;