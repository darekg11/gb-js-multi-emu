import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x23
  Memonic: INC HL
  Description: Increases value stored in HL register. Ultimately this increases L register value by 1.
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHLValue = payload.CPU.getRegisterHLValue();
    const incremented = registerHLValue + 1;
    const splitted = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(incremented);
    const safeBValue = splitted[0] & 255;
    const safeCValue = splitted[1] & 255;
    payload.CPU.setRegisterHValue(safeBValue);
    payload.CPU.setRegisterLValue(safeCValue);
    payload.CPU.increaseProgramCounter();
}

export default handle;