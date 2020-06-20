import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xEE
  Memonic: SET 5 (HL)
  Description: Sets bit 5 (sixth to the right) of value under memory index from register HL to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 16
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const memoryIndex = payload.CPU.getRegisterHLValue();
    const memoryValue = payload.Memory.read8BitsValue(memoryIndex);
    const newValue = numberUtils.setBit(memoryValue, 5);
    payload.Memory.write8BitsValue(memoryIndex, newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;