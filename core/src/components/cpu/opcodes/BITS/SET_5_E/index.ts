import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xEB
  Memonic: SET 5 E
  Description: Sets bit 5 (sixth to the right) of register E to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerEValue = payload.CPU.getRegisterEValue();
    const newValue = numberUtils.setBit(registerEValue, 5);
    payload.CPU.setRegisterEValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;