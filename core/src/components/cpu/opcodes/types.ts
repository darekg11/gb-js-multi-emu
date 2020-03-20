import CPU from "../cpu";
import Memory from "../../memory/memory";

export interface IOpCodeHanlePayload {
    CPU: CPU,
    Memory: Memory
}