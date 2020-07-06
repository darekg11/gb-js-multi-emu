import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xFF
  Memonic: SET 7 A
  Description: Sets bit 7 (first to the left) of register A to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const newValue = numberUtils.setBit(registerAValue, 7);
    payload.CPU.setRegisterAValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;