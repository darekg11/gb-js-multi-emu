import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x03
  Memonic: INC BC
  Description: Increases value stored in BC register. Ultimately this increases C register value by 1.
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerBCValue = payload.CPU.getRegisterBCValue();
    const incremented = registerBCValue + 1;
    const splitted = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(incremented);
    const safeBValue = splitted[0] & 255;
    const safeCValue = splitted[1] & 255;
    payload.CPU.setRegisterBValue(safeBValue);
    payload.CPU.setRegisterCValue(safeCValue);
    payload.CPU.increaseProgramCounter();
}

export default handle;