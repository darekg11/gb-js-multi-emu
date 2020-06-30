import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF2
  Memonic: LD A, (C)
  Description: Loads to register A a value from memory under cell index hold in register C
  The full 16-bit absolute address is obtained by setting the most significant byte to 0xFF and
  the least significant byte to the value of C, so the possible range is 0xFF00-0xFFFF
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const firstHalfOfMemoryIndex = 0xFF;
    const secondHalfOfMemoryIndex = payload.CPU.getRegisterCValue();
    const index = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalfOfMemoryIndex, secondHalfOfMemoryIndex);
    const value = payload.Memory.read8BitsValue(index);
    payload.CPU.setRegisterAValue(value);
    payload.CPU.increaseProgramCounter(1);
    return 8;
}

export default handle;