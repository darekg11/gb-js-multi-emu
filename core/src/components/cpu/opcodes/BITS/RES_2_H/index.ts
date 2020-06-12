import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x94
  Memonic: RES 2 H
  Description: Sets bit 2 (third to the right) of register H to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const newValue = numberUtils.unsetBit(registerHValue, 2);
    payload.CPU.setRegisterHValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;