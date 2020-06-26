import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x53
  Memonic: LD D, E
  Description: Loads to register D value currently holded in register E
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterEValue();
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;