import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xA1
  Memonic: RES 4 C
  Description: Sets bit 4 (fifth to the right) of register C to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const newValue = numberUtils.unsetBit(registerCValue, 4);
    payload.CPU.setRegisterCValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;