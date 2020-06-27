import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x7F
  Memonic: LD A, A
  Description: Loads to register A value currently holded in register A
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterAValue();
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;