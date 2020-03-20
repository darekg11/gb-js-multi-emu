import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x63
  Memonic: LD H, E
  Description: Loads to register H value currently holded in register E
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterEValue();
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;