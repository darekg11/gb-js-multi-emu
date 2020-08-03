import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xFA
  Memonic: LD A, (nn)
  Description: Loads to register A value (2 byte === 16 bits) from two next memory cells (PC++ && PC++)
  Size: 3 Byte - increments PC by 3
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const index = payload.Memory.read16BitsValue(memoryIndexToRead);
    const value = payload.Memory.read8BitsValue(index);
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(3);
    return 16;
}

export default handle;