import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x31
  Memonic: LD SP, nn
  Description: Loads to register SP (16bits), value combined from two next memory cells (PC++ && PC++)
  Size: 3 Byte - increments PC by 3
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read16BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterSPValue(value);
    payload.CPU.increaseProgramCounter(3);
    return 12;
}

export default handle;