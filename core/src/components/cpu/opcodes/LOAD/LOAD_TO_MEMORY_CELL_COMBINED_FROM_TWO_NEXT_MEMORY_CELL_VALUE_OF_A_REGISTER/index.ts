import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xEA
  Memonic: LD (nn), A
  Description: Loads to memory cell under index combined from two next memory cells (PC++ && PC++), a value of Register A
  Size: 3 Byte - increments PC by 3
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const index = payload.Memory.read16BitsValue(memoryIndexToRead);
    const value = payload.CPU.getRegisterAValue()
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(3);
    return 16;
}

export default handle;