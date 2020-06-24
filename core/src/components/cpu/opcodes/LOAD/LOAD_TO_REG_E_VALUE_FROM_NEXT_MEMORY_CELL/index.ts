import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x1E
  Memonic: LD E, d8
  Description: Loads to register E value (1 byte === 8 bits) from next memory cell (PC++)
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read8BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterEValue(value);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;