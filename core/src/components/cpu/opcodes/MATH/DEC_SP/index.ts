import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x3B
  Memonic: DEC SP
  Description: Decreases value stored in SP register.
    Flags are not affected.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const registerSPValue = payload.CPU.getRegisterSPValue();
    const incremented = registerSPValue - 1;
    const safeValue = incremented & 65535;
    payload.CPU.setRegisterSPValue(safeValue);
    payload.CPU.increaseProgramCounter();
    return 8;
}

export default handle;