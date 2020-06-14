import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xB0
  Memonic: RES 6 B
  Description: Sets bit 6 (seventh to the right) of register B to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerBValue = payload.CPU.getRegisterBValue();
    const newValue = numberUtils.unsetBit(registerBValue, 6);
    payload.CPU.setRegisterBValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;