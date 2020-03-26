import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xFA
  Memonic: LD A, (nn)
  Description: Loads to register A value (2 byte === 16 bits) from two next memory cells (PC++ && PC++)
  Size: 3 Byte - increments PC by 3
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const index = payload.Memory.read16BitsValue(memoryIndexToRead);
    const value = payload.Memory.read8BitsValue(index);
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(3);
}

export default handle;