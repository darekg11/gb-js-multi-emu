import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xCF
  Memonic: RST 8
  Description: Call 0x8 address.
  Size: 1 Byte - increments PC by 1 if jump is not made
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    payload.CPU.decreaseStackPointer(2);
    payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter + 1);
    payload.CPU.jump(0x8);
    return 16;
}

export default handle;