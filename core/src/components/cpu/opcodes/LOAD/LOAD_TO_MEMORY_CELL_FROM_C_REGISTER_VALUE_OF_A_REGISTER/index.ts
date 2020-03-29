import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xE2
  Memonic: LD (C), A
  Description: Loads to memory index under register C a value from register A
  The full 16-bit absolute address is obtained by setting the most significant byte to 0xFF and
  the least significant byte to the value of C, so the possible range is 0xFF00-0xFFFF
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const firstHalfOfMemoryIndex = 0xFF;
    const secondHalfOfMemoryIndex = payload.CPU.getRegisterCValue();
    const index = numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstHalfOfMemoryIndex, secondHalfOfMemoryIndex);
    const value = payload.CPU.getRegisterAValue();
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;