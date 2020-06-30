import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF1
  Memonic: POP AF
  Description: Loads to register AF value from stack.
  In reality this is F = memory[sp]; sp++ A = memory[sp]; sp++
  Stack grows downward in GameBoy.
  Size: 1 Byte - increments PC by 1
  Cycles: 12
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerFValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    const registerAValue = payload.Memory.read8BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer();
    payload.CPU.setRegisterAValue(registerAValue);
    payload.CPU.setRegisterFValue(registerFValue);
    payload.CPU.increaseProgramCounter(1);
    return 12;
}

export default handle;