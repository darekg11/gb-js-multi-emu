import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x13
  Memonic: INC DE
  Description: Increases value stored in DE register. Ultimately this increases E register value by 1.
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerDEValue = payload.CPU.getRegisterDEValue();
    const incremented = registerDEValue + 1;
    const splitted = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(incremented);
    const safeBValue = splitted[0] & 255;
    const safeCValue = splitted[1] & 255;
    payload.CPU.setRegisterDValue(safeBValue);
    payload.CPU.setRegisterEValue(safeCValue);
    payload.CPU.increaseProgramCounter();
}

export default handle;