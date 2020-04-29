import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF9
  Memonic: LD SP, HL
  Description: Loads to register SP value from register HL.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerHLValue = payload.CPU.getRegisterHLValue();
    payload.CPU.setRegisterSPValue(registerHLValue);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;