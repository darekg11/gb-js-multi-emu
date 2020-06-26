import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x62
  Memonic: LD H, D
  Description: Loads to register H value currently holded in register D
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterDValue();
    payload.CPU.setRegisterHValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;