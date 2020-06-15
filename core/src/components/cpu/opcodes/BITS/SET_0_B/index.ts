import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xC0
  Memonic: SET 0 B
  Description: Sets bit 0 (most to the right) of register B to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerBValue = payload.CPU.getRegisterBValue();
    const newValue = numberUtils.setBit(registerBValue, 0);
    payload.CPU.setRegisterBValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;