import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xD2
  Memonic: JMP NC, nn
  Description: Jump to 16 bits address combined from two next memory cells if Carry Flag is not set.
  Size: 3 Byte - increments PC by 3 if jump is not made
  Cycles: 16 if jump is taken, 12 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    if (!isCarryFlagSet) {
        const currentProgramCounter = payload.CPU.getProgramCounter();
        const firstHalf = payload.Memory.read8BitsValue(currentProgramCounter + 1);
        const secondHalf = payload.Memory.read8BitsValue(currentProgramCounter + 2);
        const value = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalf, secondHalf);
        payload.CPU.jump(value);
    } else {
        payload.CPU.increaseProgramCounter(3);
    }
}

export default handle;