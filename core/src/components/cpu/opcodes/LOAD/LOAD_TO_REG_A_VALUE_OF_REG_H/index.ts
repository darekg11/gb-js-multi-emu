import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x7C
  Memonic: LD A, H
  Description: Loads to register A value currently holded in register H
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterHValue();
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;