import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xFB
  Memonic: EI
  Description: Enables interrupts.
  Size: 1 Byte - increments PC by 1
  Cycles: 1
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    payload.CPU.enableInterrupts();
    payload.CPU.increaseProgramCounter(1);
}

export default handle;