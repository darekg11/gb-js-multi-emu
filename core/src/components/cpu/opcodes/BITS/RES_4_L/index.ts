import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xA5
  Memonic: RES 4 L
  Description: Sets bit 4 (fifth to the right) of register L to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerLValue = payload.CPU.getRegisterLValue();
    const newValue = numberUtils.unsetBit(registerLValue, 4);
    payload.CPU.setRegisterLValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;