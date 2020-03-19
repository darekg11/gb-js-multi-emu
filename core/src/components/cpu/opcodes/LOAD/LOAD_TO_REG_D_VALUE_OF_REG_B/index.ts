import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x50
  Memonic: LD D, B
  Description: Loads to register D value currently holded in register B
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterBValue();
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;