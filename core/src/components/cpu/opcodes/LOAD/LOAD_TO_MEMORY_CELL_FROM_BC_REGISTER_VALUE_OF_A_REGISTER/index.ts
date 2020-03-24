import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x02
  Memonic: LD (BC), A
  Description: Loads to memory cell under index retrieved from BC register a value from register A
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const value = payload.CPU.getRegisterAValue();
    const index = payload.CPU.getRegisterBCValue();
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;