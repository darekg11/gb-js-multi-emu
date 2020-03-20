import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x64
  Memonic: LD H, H
  Description: Loads to register H value currently holded in register H
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterHValue();
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;