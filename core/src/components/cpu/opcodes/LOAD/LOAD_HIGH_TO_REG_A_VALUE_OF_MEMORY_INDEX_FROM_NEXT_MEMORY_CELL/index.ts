import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF0
  Memonic: LDH A, (n)
  Description: Loads high (0xFF00 + n) to register A value (2 byte === 16 bits) from next memory cell (PC++)
  The full 16-bit absolute address is obtained by setting the most significant byte to
  0xFF and the least significant byte to the value of n, so the possible range is 0xFF00-0xFFFF.
  Size: 2 Byte - increments PC by 2
  Cycles: 3
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const memoryIndexToRead = currentProgramCounter + 1;
    const firstHalfOfMemoryIndex = 0xFF;
    const secondHalfOfMemoryIndex = payload.Memory.read8BitsValue(memoryIndexToRead);
    const index = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalfOfMemoryIndex, secondHalfOfMemoryIndex);
    const value = payload.Memory.read8BitsValue(index);
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;