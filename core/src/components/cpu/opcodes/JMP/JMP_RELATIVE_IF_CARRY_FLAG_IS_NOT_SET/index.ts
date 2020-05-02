import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x30
  Memonic: JR NC, n
  Description: Jump to relative address (PC + n) if Zero Flag is not set.
  Size: 2 Byte - increments PC by 2 if jump is not made
  Cycles: 12 if jump is taken, 8 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    if (!isCarryFlagSet) {
        const currentProgramCounter = payload.CPU.getProgramCounter();
        const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
        payload.CPU.jump(currentProgramCounter + memoryValue);
    } else {
        payload.CPU.increaseProgramCounter(2);
    }
}

export default handle;