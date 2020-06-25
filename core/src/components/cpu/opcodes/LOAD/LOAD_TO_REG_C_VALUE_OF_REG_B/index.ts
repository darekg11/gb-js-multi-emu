import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x48
  Memonic: LD C, B
  Description: Loads to register C value currently holded in register B
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterBValue();
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;