import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x7A
  Memonic: LD A, D
  Description: Loads to register A value currently holded in register D
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterDValue();
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;