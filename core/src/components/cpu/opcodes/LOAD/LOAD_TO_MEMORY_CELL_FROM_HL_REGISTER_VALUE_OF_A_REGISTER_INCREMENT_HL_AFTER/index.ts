import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x22
  Memonic: LD (HL+), A
  Description: Loads to memory cell under index retrieved from HL register a value from register A.
  HL value is incremented afterwards.
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload): number => {
    const value = payload.CPU.getRegisterAValue();
    const index = payload.CPU.getRegisterHLValue();
    console.log("LD (HL+) A - index: %s, PC: %s", index, payload.CPU.getProgramCounter());
    if (index === 0xFF50) {
      console.log("LD (HL+) A. ROBI UNMAP, PC: %s", payload.CPU.getProgramCounter());
    }
    payload.Memory.write8BitsValue(index, value);
    payload.CPU.setRegisterHLValue(index + 1);
    payload.CPU.increaseProgramCounter(1);
    return 8;
}

export default handle;