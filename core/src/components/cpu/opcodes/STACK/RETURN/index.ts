import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xC9
  Memonic: RET
  Description: Returns from function.
  Size: 1 Byte - increments PC by 1 if return is not executed
  Cycles: 16
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const address = payload.Memory.read16BitsValue(payload.CPU.getRegisterSPValue());
    payload.CPU.increaseStackPointer(2);
    payload.CPU.jump(address);
}

export default handle;