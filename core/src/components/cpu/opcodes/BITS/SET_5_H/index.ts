import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xEC
  Memonic: SET 5 H
  Description: Sets bit 5 (sixth to the right) of register H to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const newValue = numberUtils.setBit(registerHValue, 5);
    payload.CPU.setRegisterHValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;