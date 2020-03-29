import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xE0
  Memonic: LD (n), A
  Description: Loads to memory cell under index combined from next memory cell (PC++), a value of Register A
  Size: 2 Byte - increments PC by 2
  Cycles: 3
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const firstHalfOfIndex = 0xFF;
    const secondHalfOfIndex = payload.Memory.read8BitsValue(memoryIndexToRead);
    const index = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalfOfIndex, secondHalfOfIndex);
    const value = payload.CPU.getRegisterAValue()
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;