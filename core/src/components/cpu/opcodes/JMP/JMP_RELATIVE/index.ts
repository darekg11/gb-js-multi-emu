import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x18
  Memonic: JR n
  Description: Jump to relative address (PC + n).
  Size: 2 Byte - increments PC by 2 if jump is not made
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    payload.CPU.jump(currentProgramCounter + memoryValue);
    return 12;
}

export default handle;