import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xD6
  Memonic: SET 2 (HL)
  Description: Sets bit 2 (third to the right) of value under memory index from register HL to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    const newValue = numberUtils.setBit(memoryValue, 2);
    payload.Memory.write8BitsValue(memoryIndex, newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;