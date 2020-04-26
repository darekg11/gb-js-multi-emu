import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x2F
  Memonic: CPL
  Description: Flips all the bits in the 8-bit A register, and sets the N and H flags.
  Size: 1 Byte - increments PC by 1
  Cycles: 1
  Flags affected:
    ZERO Flag: Not affected
    SUB Flag: 1
    HALF CARRY Flag: 1
    CARRY Flag: Not affected

*/
const handle = (payload: IOpCodeHanlePayload) => {
    const registerAValue = payload.CPU.getRegisterAValue();
    const flipped = registerAValue ^ 0xFF;
    payload.CPU.setSubtractionFlag();
    payload.CPU.setHalfCarryFlag();
    payload.CPU.setRegisterAValue(flipped);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;