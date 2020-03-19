import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x54
  Memonic: LD D, H
  Description: Loads to register D value currently holded in register H
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterHValue();
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;