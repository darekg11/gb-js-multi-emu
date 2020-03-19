import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4D
  Memonic: LD C, L
  Description: Loads to register C value currently holded in register L
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterLValue();
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;