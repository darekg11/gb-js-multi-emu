import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x0
  Memonic: NOOP
  Description: Increases PC by 1
  Size: 1 Byte - increments PC by 1
  Cycles: 1
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    payload.CPU.increaseProgramCounter(1);
}

export default handle;