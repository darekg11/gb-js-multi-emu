import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4A
  Memonic: LD C, D
  Description: Loads to register C value currently holded in register D
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterDValue();
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;