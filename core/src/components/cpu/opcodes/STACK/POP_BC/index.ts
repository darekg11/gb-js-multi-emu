import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xC1
  Memonic: POP BC
  Description: Loads to register BC value from stack.
  In reality this is C = memory[sp]; sp++ B = memory[sp]; sp++
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerCValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    const registerBValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    payload.CPU.setRegisterBValue(registerBValue);
    payload.CPU.setRegisterCValue(registerCValue);
    payload.CPU.increaseProgramCounter(1);
    return 12;
}

export default handle;