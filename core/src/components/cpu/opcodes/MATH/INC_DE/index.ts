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
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerDEValue = payload.CPU.getRegisterDEValue();
    const incremented = registerDEValue + 1;
    const splitted = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(incremented);
    const safeDValue = splitted[0] & 255;
    const safeEValue = splitted[1] & 255;
    payload.CPU.setRegisterDValue(safeDValue);
    payload.CPU.setRegisterEValue(safeEValue);
    payload.CPU.increaseProgramCounter();
    return 8;
}

export default handle;