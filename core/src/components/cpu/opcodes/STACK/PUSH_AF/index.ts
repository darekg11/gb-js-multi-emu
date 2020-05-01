import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF5
  Memonic: PUSH AF
  Description: Push AF register to stack.
  In reality this is sp--; push A; sp--; push F;
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const registerFValue = payload.CPU.getRegisterFValue();
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerAValue);
    payload.CPU.decreaseStackPointer();
    payload.Memory.write8BitsValue(payload.CPU.getRegisterSPValue(), registerFValue);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;