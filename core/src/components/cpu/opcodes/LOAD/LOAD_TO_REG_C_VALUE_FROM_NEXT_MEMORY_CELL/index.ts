import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0E
  Memonic: LD C, d8
  Description: Loads to register C value (1 byte === 8 bits) from next memory cell (PC++)
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read8BitsValue(memoryIndexToRead);
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;