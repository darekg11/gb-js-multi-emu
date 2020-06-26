import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x6D
  Memonic: LD L, L
  Description: Loads to register L value currently holded in register L
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterLValue();
    payload.CPU.setRegisterLValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;