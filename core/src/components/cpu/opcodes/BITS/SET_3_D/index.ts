import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xDA
  Memonic: SET 3 D
  Description: Sets bit 3 (fourth to the right) of register D to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerDValue = payload.CPU.getRegisterDValue();
    const newValue = numberUtils.setBit(registerDValue, 3);
    payload.CPU.setRegisterDValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;