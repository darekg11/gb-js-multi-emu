import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x38
  Memonic: JR C, n
  Description: Jump to relative address (PC + n) if Carry Flag is set.
               n is SIGNED BYTE
  Size: 2 Byte - increments PC by 2 if jump is not made
  Cycles: 12 if jump is taken, 8 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    if (isCarryFlagSet) {
        const currentProgramCounter = payload.CPU.getProgramCounter();
        const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
        const signedMemoryValue = memoryValue > 127 ? ((~memoryValue + 1) & 255) : memoryValue;
        payload.CPU.jump(currentProgramCounter + 2 + signedMemoryValue);
        return 12;
    } else {
        payload.CPU.increaseProgramCounter(2);
        return 8;
    }
}

export default handle;