import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x27
  Memonic: DAA
  Description: https://ehaskins.com/2018-01-30%20Z80%20DAA/
  Size: 1 Byte - increments PC by 1
  Cycles: 4
  Flags affected:
    ZERO Flag: Set if final result is 0
    SUB Flag: Not affected
    HALF CARRY Flag: 0
    CARRY Flag: 1 if final result is above 99, else nothing

*/
const handle = (payload: IOpCodeHanlePayload): number => {
    // last operation was a addition
    // if this is above 0x09 then add 0x6
    // if this is above 0x99 then add 0x60
    if (!payload.CPU.isSubtractionFlagSet()) {
        if (payload.CPU.isCarryFlagSet() || payload.CPU.getRegisterAValue() > 0x99) {
            payload.CPU.setCarryFlag();
            payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() + 0x60) & 0xFF);
        }
        if (payload.CPU.isHalfCarryFlagSet() || (payload.CPU.getRegisterAValue() & 0x0F) > 0x09) {
            payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() + 0x06) & 0xFF);
        }
    // last operation was subtraction
    } else {
        if (payload.CPU.isCarryFlagSet()) {
            payload.CPU.setCarryFlag();
            payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() - 0x60) & 0xFF);
        }
        if (payload.CPU.isHalfCarryFlagSet()) {
            payload.CPU.setRegisterAValue((payload.CPU.getRegisterAValue() - 0x06) & 0xFF);
        }
    }
    if (payload.CPU.getRegisterAValue() === 0) {
        payload.CPU.setZeroFlag();
    } else {
        payload.CPU.unsetZeroFlag();
    }
    payload.CPU.unsetHalfCarryFlag();
    payload.CPU.increaseProgramCounter(1);
    return 4;
}

export default handle;