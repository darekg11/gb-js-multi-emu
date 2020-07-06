import { IOpCodeHanlePayload } from "../../types";
import { numberUtils } from "../../../../../utils";

/*
  OP Code: 0xF1
  Memonic: SET 6 C
  Description: Sets bit 6 (seventh to the right) of register C to 1.
  Size: 2 Byte - increments PC by 2
  Cycles: 8
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerCValue = payload.CPU.getRegisterCValue();
    const newValue = numberUtils.setBit(registerCValue, 6);
    payload.CPU.setRegisterCValue(newValue);
    payload.CPU.increaseProgramCounter(2);
    return 8;
}

export default handle;