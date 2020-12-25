import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x18
  Memonic: JR n
  Description: Jump to relative address (PC + n).
               n is SIGNED BYTE
  Size: 2 Byte
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
    const signedMemoryValue = memoryValue > 127 ? -((~memoryValue + 1) & 255) : memoryValue;
    payload.CPU.jump(currentProgramCounter + 2 + signedMemoryValue);
    return 12;
}

export default handle;