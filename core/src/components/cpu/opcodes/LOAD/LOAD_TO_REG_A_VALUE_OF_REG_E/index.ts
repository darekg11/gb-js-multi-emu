import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x7B
  Memonic: LD A, E
  Description: Loads to register A value currently holded in register E
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterEValue();
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;