import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x1B
  Memonic: DEC DE
  Description: Decreases value stored in DE register. Ultimately this decreases E register value by 1.
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerDEValue = payload.CPU.getRegisterDEValue();
    const incremented = registerDEValue - 1;
    const splitted = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(incremented);
    const safeBValue = splitted[0] & 255;
    const safeCValue = splitted[1] & 255;
    payload.CPU.setRegisterDValue(safeBValue);
    payload.CPU.setRegisterEValue(safeCValue);
    payload.CPU.increaseProgramCounter();
    return 8;
}

export default handle;