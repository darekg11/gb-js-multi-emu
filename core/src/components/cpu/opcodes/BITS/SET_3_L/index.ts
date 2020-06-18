import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xDD
  Memonic: SET 3 L
  Description: Sets bit 3 (fourth to the right) of register L to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerLValue = payload.CPU.getRegisterLValue();
    const newValue = numberUtils.setBit(registerLValue, 3);
    payload.CPU.setRegisterLValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;