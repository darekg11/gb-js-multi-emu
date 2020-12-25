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
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const value = payload.Memory.read16BitsValue(currentProgramCounter + 1);
    payload.CPU.jump(value);
    return 16;
}

export default handle;