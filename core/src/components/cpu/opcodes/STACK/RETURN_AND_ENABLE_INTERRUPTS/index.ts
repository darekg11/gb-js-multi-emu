import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD9
  Memonic: RETI
  Description: Returns from function and enables interrupts.
  Size: 1 Byte - increments PC by 1 if return is not executed
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    payload.CPU.enableInterrupts();
    const address = payload.Memory.read16BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer(2);
    payload.CPU.jump(address);
    return 16;
}

export default handle;