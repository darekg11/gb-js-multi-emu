import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x41
  Memonic: LD B, C
  Description: Loads to register B value currently holded in register C
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterCValue();
    payload.CPU.setRegisterBValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;