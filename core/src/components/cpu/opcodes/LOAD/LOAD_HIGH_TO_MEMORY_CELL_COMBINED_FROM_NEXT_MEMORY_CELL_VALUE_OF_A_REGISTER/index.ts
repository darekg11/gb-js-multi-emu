import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xE0
  Memonic: LDH (n), A
  Description: Loads high (0xFF00 + n) to memory cell under index combined from next memory cell (PC++), a value of Register A
  Size: 2 Byte - increments PC by 2
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const firstHalfOfIndex = 0xFF;
    const secondHalfOfIndex = payload.Memory.read8BitsValue(memoryIndexToRead);
    const index = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalfOfIndex, secondHalfOfIndex);
    const value = payload.CPU.getRegisterAValue()
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(2);
    return 12;
}

export default handle;