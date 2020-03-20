import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x65
  Memonic: LD H, L
  Description: Loads to register H value currently holded in register L
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterLValue();
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;