import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x5F
  Memonic: LD E, A
  Description: Loads to register E value currently holded in register A
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterAValue();
    payload.CPU.setRegisterEValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;