import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x8C
  Memonic: RES 1 H
  Description: Sets bit 1 (second to the right) of register H to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const newValue = numberUtils.unsetBit(registerHValue, 1);
    payload.CPU.setRegisterHValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;