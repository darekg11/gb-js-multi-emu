import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x20
  Memonic: JR NZ, n
  Description: Jump to relative address (PC + n) if Zero Flag is not set.
               n is SIGNED BYTE
  Size: 2 Byte - increments PC by 2 if jump is not made
  Cycles: 12 if jump is taken, 8 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const isZeroFlagSet = payload.CPU.isZeroFlagSet();
    if (!isZeroFlagSet) {
        const currentProgramCounter = payload.CPU.getProgramCounter();
        console.log(currentProgramCounter);
        const memoryValue = payload.Memory.read8BitsValue(currentProgramCounter + 1);
        console.log(memoryValue);
        const signedMemoryValue = memoryValue > 127 ? -((~memoryValue + 1) & 255) : memoryValue;
        console.log(signedMemoryValue);
        payload.CPU.jump(currentProgramCounter + 2 + signedMemoryValue);
        return 12;
    } else {
        payload.CPU.increaseProgramCounter(2);
        return 8;
    }
}

export default handle;