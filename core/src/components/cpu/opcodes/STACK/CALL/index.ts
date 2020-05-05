import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xCD
  Memonic: CALL nn
  Description: Call relative address (nn).
  Size: 3 Byte - increments PC by 3 if jump is not made
  Cycles: 24
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const address = payload.Memory.read16BitsValue(currentProgramCounter + 1);
    payload.CPU.decreaseStackPointer(2);
    payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter);
    payload.CPU.jump(address);
}

export default handle;