import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x36
  Memonic: LD (HL), d8
  Description: Loads to memory cell under index retrieved from HL register a value from next memory cell (PC++)
  Size: 2 Byte - increments PC by 2
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToWrite = payload.CPU.getRegisterHLValue();
    const memoryIndexToRead = currentProgramCounter + 1;
    const value = payload.Memory.read8BitsValue(memoryIndexToRead);
    payload.Memory.write8BitsValue(memoryIndexToWrite, value);
    payload.CPU.increaseProgramCounter(2);
    return 12;
}

export default handle;