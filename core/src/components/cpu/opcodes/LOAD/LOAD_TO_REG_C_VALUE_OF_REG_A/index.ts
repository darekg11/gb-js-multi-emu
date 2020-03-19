import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4F
  Memonic: LD C, A
  Description: Loads to register C value currently holded in register A
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterAValue();
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;