import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x01
  Memonic: LD BC, nn
  Description: Loads to register BC (16bits), value combined from two next memory cells (PC++ && PC++)
  Size: 3 Byte - increments PC by 3
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read16BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterBCValue(value);
    payload.CPU.increaseProgramCounter(3);
}

export default handle;