import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xFE
  Memonic: SET 7 (HL)
  Description: Sets bit 7 (first to the left) of value under memory index from register HL to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    const newValue = numberUtils.setBit(memoryValue, 7);
    payload.Memory.write8BitsValue(memoryIndex, newValue);
    payload.CPU.increaseProgramCounter(2);
    return 16;
}

export default handle;