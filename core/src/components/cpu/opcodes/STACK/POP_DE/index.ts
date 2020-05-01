import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD1
  Memonic: POP DE
  Description: Loads to register DE value from stack.
  In reality this is E = memory[sp]; sp++ D = memory[sp]; sp++
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerEValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    const registerDValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    payload.CPU.setRegisterDValue(registerDValue);
    payload.CPU.setRegisterEValue(registerEValue);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;