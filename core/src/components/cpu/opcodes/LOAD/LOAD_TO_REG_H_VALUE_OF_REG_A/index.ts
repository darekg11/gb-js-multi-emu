import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x67
  Memonic: LD H, A
  Description: Loads to register H value currently holded in register A
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterAValue();
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;