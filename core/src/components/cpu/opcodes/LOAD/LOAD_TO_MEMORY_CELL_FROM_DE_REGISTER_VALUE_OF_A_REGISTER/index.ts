import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x12
  Memonic: LD (DE), A
  Description: Loads to memory cell under index retrieved from DE register a value from register A
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterAValue();
    const index = payload.CPU.getRegisterDEValue();
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(1);
    return 8;
}

export default handle;