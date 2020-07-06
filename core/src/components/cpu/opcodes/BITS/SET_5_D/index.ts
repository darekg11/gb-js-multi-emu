import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xEA
  Memonic: SET 5 D
  Description: Sets bit 5 (sixth to the right) of register D to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerDValue = payload.CPU.getRegisterDValue();
    const newValue = numberUtils.setBit(registerDValue, 5);
    payload.CPU.setRegisterDValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;