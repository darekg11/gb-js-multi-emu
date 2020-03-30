import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x11
  Memonic: LD DE, nn
  Description: Loads to register DE (16bits), value combined from two next memory cells (PC++ && PC++)
  Size: 3 Byte - increments PC by 3
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read16BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterDEValue(value);
    payload.CPU.increaseProgramCounter(3);
}

export default handle;