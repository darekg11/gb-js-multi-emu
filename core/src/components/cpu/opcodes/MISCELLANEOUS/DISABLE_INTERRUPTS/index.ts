import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xF3
  Memonic: DI
  Description: Disables interrupts.
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    payload.CPU.disableInterrupts();
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;