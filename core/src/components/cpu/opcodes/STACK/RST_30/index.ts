import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF7
  Memonic: RST 30
  Description: Call 0x30 address.
  Size: 1 Byte - increments PC by 1 if jump is not made
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    payload.CPU.decreaseStackPointer(2);
    payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter + 1);
    payload.CPU.jump(0x30);
    return 16;
}

export default handle;