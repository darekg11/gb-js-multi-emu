import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF2
  Memonic: SET 6 D
  Description: Sets bit 6 (seventh to the right) of register D to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerDValue = payload.CPU.getRegisterDValue();
    const newValue = numberUtils.setBit(registerDValue, 6);
    payload.CPU.setRegisterDValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;