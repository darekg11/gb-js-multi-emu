import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD5
  Memonic: PUSH DE
  Description: Push DE register to stack.
  In reality this is sp--; push D; sp--; push E;
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerDValue = payload.CPU.getRegisterDValue();
    const registerEValue = payload.CPU.getRegisterEValue();
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerDValue);
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerEValue);
    payload.CPU.increaseProgramCounter(1);
    return 16;
}

export default handle;