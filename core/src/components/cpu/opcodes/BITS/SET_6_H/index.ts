import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF4
  Memonic: SET 6 H
  Description: Sets bit 6 (seventh to the right) of register H to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const newValue = numberUtils.setBit(registerHValue, 6);
    payload.CPU.setRegisterHValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;