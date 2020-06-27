import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x78
  Memonic: LD A, B
  Description: Loads to register A value currently holded in register B
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterBValue();
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;