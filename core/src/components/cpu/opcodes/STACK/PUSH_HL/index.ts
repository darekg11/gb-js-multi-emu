import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE5
  Memonic: PUSH HL
  Description: Push HL register to stack.
  In reality this is sp--; push H; sp--; push L;
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerHValue = payload.CPU.getRegisterHValue();
    const registerLValue = payload.CPU.getRegisterLValue();
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerHValue);
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerLValue);
    payload.CPU.increaseProgramCounter(1);
    return 16;
}

export default handle;