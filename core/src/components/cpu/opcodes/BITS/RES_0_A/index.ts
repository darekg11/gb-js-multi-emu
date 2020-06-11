import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x87
  Memonic: RES 0 A
  Description: Sets bit 0 (most to the right) of register A to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const newValue = numberUtils.unsetBit(registerAValue, 0);
    payload.CPU.setRegisterAValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;