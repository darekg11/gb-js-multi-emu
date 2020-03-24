import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0A
  Memonic: LD A, (BC)
  Description: Loads to register A a value from memory under cell index hold in register BC
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryIndexToRead = payload.CPU.getRegisterBCValue();
    const value = payload.Memory.read8BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;