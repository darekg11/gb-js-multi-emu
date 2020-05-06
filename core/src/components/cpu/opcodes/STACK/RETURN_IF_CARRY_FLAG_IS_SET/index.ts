import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD8
  Memonic: RET C
  Description: Returns from function if Carry Flag is set.
  Size: 1 Byte - increments PC by 1 if return is not executed
  Cycles: 20 if return is made, 8 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    if (isCarryFlagSet) {
        const address = payload.Memory.read16BitsValue(payload.CPU.getRegisterSPValue());
        payload.CPU.increaseStackPointer(2);
        payload.CPU.jump(address);
    } else {
        payload.CPU.increaseProgramCounter(1);
    }
}

export default handle;