import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xE1
  Memonic: POP HL
  Description: Loads to register HL value from stack.
  In reality this is L = memory[sp]; sp++ H = memory[sp]; sp++
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerLValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    const registerHValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    payload.CPU.setRegisterHValue(registerHValue);
    payload.CPU.setRegisterLValue(registerLValue);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;