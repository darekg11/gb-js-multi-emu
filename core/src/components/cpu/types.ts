import { IOpCodeHanlePayload } from "./opcodes/types"

export type CPU_REGISTERS = "A" | "B" | "C" | "D" | "E" | "F" | "H" | "L" | "AF" | "BC" | "DE" | "HL" | "SP"
export interface ICPURegisters {
    A: number
    B: number
    C: number
    D: number
    E: number
    F: number
    H: number
    L: number
    [index: string]: number;
}

export interface IJumpTable {
    [index: number]: ((payload: IOpCodeHanlePayload) => number) | undefined
}