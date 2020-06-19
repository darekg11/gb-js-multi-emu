import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xE4
  Memonic: SET 4 H
  Description: Sets bit 4 (fifth to the right) of register H to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const newValue = numberUtils.setBit(registerHValue, 4);
    payload.CPU.setRegisterHValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;