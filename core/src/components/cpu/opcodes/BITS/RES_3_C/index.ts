import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0x99
  Memonic: RES 3 C
  Description: Sets bit 3 (fourth to the right) of register C to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const newValue = numberUtils.unsetBit(registerCValue, 3);
    payload.CPU.setRegisterCValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;