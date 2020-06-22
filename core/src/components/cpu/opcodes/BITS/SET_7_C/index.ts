import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF9
  Memonic: SET 7 C
  Description: Sets bit 7 (first to the left) of register C to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const newValue = numberUtils.setBit(registerCValue, 7);
    payload.CPU.setRegisterCValue(newValue);
    payload.CPU.increaseProgramCounter(2);
}

export default handle;