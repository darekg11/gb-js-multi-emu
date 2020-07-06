import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF5
  Memonic: SET 6 L
  Description: Sets bit 6 (seventh to the right) of register L to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerLValue = payload.CPU.getRegisterLValue();
    const newValue = numberUtils.setBit(registerLValue, 6);
    payload.CPU.setRegisterLValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;