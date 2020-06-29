import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xC8
  Memonic: RET Z
  Description: Returns from function if Zero Flag is set.
  Size: 1 Byte - increments PC by 1 if return is not executed
  Cycles: 20 if return is made, 8 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const isZeroFlagSet = payload.CPU.isZeroFlagSet();
    if (isZeroFlagSet) {
        const address = payload.Memory.read16BitsValue(payload.CPU.getRegisterSPValue());
        payload.CPU.increaseStackPointer(2);
        payload.CPU.jump(address);
        return 20;
    } else {
        payload.CPU.increaseProgramCounter(1);
        return 8;
    }
}

export default handle;