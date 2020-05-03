import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xC3
  Memonic: JMP nn
  Description: Jump to 16 bits address combined from two next memory cells.
  Size: 3 Byte - increments PC by 3
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const firstHalf = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const secondHalf = payload.Memory.read8BitsValue(currentProgramCounter + 2);
    const value = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalf, secondHalf);
    payload.CPU.jump(value);
}

export default handle;