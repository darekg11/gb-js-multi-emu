import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0xD4
  Memonic: CALL NC, nn
  Description: Call relative address (nn) if Carry Flag is not set.
  Size: 3 Byte - increments PC by 3 if jump is not made
  Cycles: 24 if jump is taken, 12 if it is not
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const isCarryFlagSet = payload.CPU.isCarryFlagSet();
    const currentProgramCounter = payload.CPU.getProgramCounter();
    const address = payload.Memory.read16BitsValue(currentProgramCounter + 1);
    if (!isCarryFlagSet) {
        payload.CPU.decreaseStackPointer(2);
        payload.Memory.write16BitsValue(payload.CPU.getRegisterSPValue(), currentProgramCounter);
        payload.CPU.jump(address);
    } else {
        payload.CPU.increaseProgramCounter(3);
    }
}

export default handle;