import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x76
  Memonic: HALT
  Description: Halts CPU until interrupt is handled.
  Size: 2 Byte - increments PC by 1
  Cycles: 4
  Flags affected:
    None

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    payload.CPU.halt();
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;