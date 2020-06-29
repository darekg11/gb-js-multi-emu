import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xC5
  Memonic: PUSH BC
  Description: Push BC register to stack.
  In reality this is sp--; push B; sp--; push C;
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerBValue = payload.CPU.getRegisterBValue();
    const registerCValue = payload.CPU.getRegisterCValue();
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerBValue);
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerCValue);
    payload.CPU.increaseProgramCounter(1);
    return 16;
}

export default handle;