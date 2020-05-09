import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xC7
  Memonic: RST 0
  Description: Call relative address (nn).
  Size: 1 Byte - increments PC by 1 if jump is not made
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    payload.CPU.decreaseStackPointer(2);
    payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter);
    payload.CPU.jump(0);
}

export default handle;