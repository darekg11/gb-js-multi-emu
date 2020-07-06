import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF3
  Memonic: SET 6 E
  Description: Sets bit 6 (seventh to the right) of register E to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerEValue = payload.CPU.getRegisterEValue();
    const newValue = numberUtils.setBit(registerEValue, 6);
    payload.CPU.setRegisterEValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;