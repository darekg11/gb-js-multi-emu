import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE9
  Memonic: JMP (HL)
  Description: Jump to index from HL register
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHLValue = payload.CPU.getRegisterHLValue();
    payload.CPU.jump(registerHLValue);
    return 4;
}

export default handle;