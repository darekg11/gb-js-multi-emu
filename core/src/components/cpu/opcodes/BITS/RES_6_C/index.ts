import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xB1
  Memonic: RES 6 C
  Description: Sets bit 6 (seventh to the right) of register C to 0.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const newValue = numberUtils.unsetBit(registerCValue, 6);
    payload.CPU.setRegisterCValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;