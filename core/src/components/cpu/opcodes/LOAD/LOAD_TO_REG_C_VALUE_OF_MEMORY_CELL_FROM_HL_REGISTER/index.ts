import { IOpCodeHanlePayload } from "../../types";

/*
  OP Code: 0x4E
  Memonic: LD C, (HL)
  Description: Loads to register C value (1 byte === 8 bits) from memory location under index from HL register
  Size: 1 Byte - increments PC by 1
  Cycles: 8
  Flags affected: None
*/
const handle = (payload: IOpCodeHanlePayload) => {
    const valueOfHLRegister = payload.CPU.getRegisterHLValue();
    const value = payload.Memory.read8BitsValue(valueOfHLRegister);
    payload.CPU.setRegisterCValue(value);
    payload.CPU.increaseProgramCounter(1);
}

export default handle;