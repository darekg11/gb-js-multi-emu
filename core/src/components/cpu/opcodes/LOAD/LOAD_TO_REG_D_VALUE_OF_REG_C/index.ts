import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x51
  Memonic: LD D, C
  Description: Loads to register D value currently holded in register C
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterCValue();
    payload.CPU.setRegisterDValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;