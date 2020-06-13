import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xA2
  Memonic: RES 4 D
  Description: Sets bit 4 (fifth to the right) of register D to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerDValue = payload.CPU.getRegisterDValue();
    const newValue = numberUtils.unsetBit(registerDValue, 4);
    payload.CPU.setRegisterDValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;