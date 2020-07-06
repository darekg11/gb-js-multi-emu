import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xEF
  Memonic: SET 5 A
  Description: Sets bit 5 (sixth to the right) of register A to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const newValue = numberUtils.setBit(registerAValue, 5);
    payload.CPU.setRegisterAValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;