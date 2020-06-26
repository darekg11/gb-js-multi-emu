import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x57
  Memonic: LD D, A
  Description: Loads to register D value currently holded in register A
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterAValue();
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;