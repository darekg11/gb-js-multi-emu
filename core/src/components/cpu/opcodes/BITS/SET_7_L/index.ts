import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xFD
  Memonic: SET 7 L
  Description: Sets bit 7 (first to the left) of register L to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerLValue = payload.CPU.getRegisterLValue();
    const newValue = numberUtils.setBit(registerLValue, 7);
    payload.CPU.setRegisterLValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;