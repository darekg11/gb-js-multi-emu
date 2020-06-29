import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xCD
  Memonic: CALL nn
  Description: Call relative address (nn).
  Size: 3 Byte - increments PC by 3 if jump is not made
  Cycles: 24
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const address = payload.Memory.read16BitsValue(currentProgramCounter + 1);
    payload.CPU.decreaseStackPointer(2);
    payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter);
    payload.CPU.jump(address);
    return 24;
}

export default handle;