import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF8
  Memonic: SET 7 B
  Description: Sets bit 7 (first to the left) of register B to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerBValue = payload.CPU.getRegisterBValue();
    const newValue = numberUtils.setBit(registerBValue, 7);
    payload.CPU.setRegisterBValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;