import { CPU_REGISTERS, ICPURegisters } from "./types";
import { numberUtils } from "../../utils/index";

class CPU {
    // is CPU running?
    private running: boolean = false;
    // program counter
    private PC: number = 0;

    // stack pointer
    private SP: number = 0;
    // 8 bytes registers
    private registers: ICPURegisters = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
        H: 0,
        L: 0
    }

    private interruptsEnabled: boolean = true;

    private getRegisterValue = (register: CPU_REGISTERS): number => {
        if (register === "AF") {
            return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(this.registers.A, this.registers.F);
        }
        if (register === "BC") {
            return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(this.registers.B, this.registers.C);
        }
        if (register === "DE") {
            return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(this.registers.D, this.registers.E);
        }
        if (register === "HL") {
            return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(this.registers.H, this.registers.L);
        }
        if (register === "SP") {
            return this.SP;
        }
        return this.registers[register];
    }

    private setRegisterValue = (register: CPU_REGISTERS, value: number): void => {
        if (register === "AF") {
            const [ A, F ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
            this.registers.A = A;
            this.registers.F = F;
            return;
        }
        if (register === "BC") {
            const [ B, C ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
            this.registers.B = B;
            this.registers.C = C;
            return;
        }
        if (register === "DE") {
            const [ D, E ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
            this.registers.D = D;
            this.registers.E = E;
            return;
        }
        if (register === "HL") {
            const [ H, L ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
            this.registers.H = H;
            this.registers.L = L;
            return;
        }
        if (register === "SP") {
            this.SP = value;
            return;
        }
        this.registers[register] = value;
    }

    public getRegisterAValue() {
        return this.getRegisterValue("A");
    }

    public setRegisterAValue(value: number) {
        this.setRegisterValue("A", value);
    }

    public getRegisterBValue() {
        return this.getRegisterValue("B");
    }

    public setRegisterBValue(value: number) {
        this.setRegisterValue("B", value);
    }

    public getRegisterCValue() {
        return this.getRegisterValue("C");
    }

    public setRegisterCValue(value: number) {
        this.setRegisterValue("C", value);
    }

    public getRegisterDValue() {
        return this.getRegisterValue("D");
    }

    public setRegisterDValue(value: number) {
        this.setRegisterValue("D", value);
    }

    public getRegisterEValue() {
        return this.getRegisterValue("E");
    }

    public setRegisterEValue(value: number) {
        this.setRegisterValue("E", value);
    }

    public getRegisterFValue() {
        return this.getRegisterValue("F");
    }

    public setRegisterFValue(value: number) {
        this.setRegisterValue("F", value);
    }

    public setRegisterHValue(value: number) {
        this.setRegisterValue("H", value);
    }

    public getRegisterHValue() {
        return this.getRegisterValue("H");
    }

    public setRegisterLValue(value: number) {
        this.setRegisterValue("L", value);
    }

    public getRegisterLValue() {
        return this.getRegisterValue("L");
    }

    public getRegisterAFValue() {
        return this.getRegisterValue("AF");
    }

    public setRegisterAFValue(value: number) {
        this.setRegisterValue("AF", value);
    }

    public getRegisterBCValue() {
        return this.getRegisterValue("BC");
    }

    public setRegisterBCValue(value: number) {
        this.setRegisterValue("BC", value);
    }

    public getRegisterDEValue() {
        return this.getRegisterValue("DE");
    }

    public setRegisterDEValue(value: number) {
        this.setRegisterValue("DE", value);
    }

    public getRegisterHLValue() {
        return this.getRegisterValue("HL");
    }

    public setRegisterHLValue(value: number) {
        this.setRegisterValue("HL", value);
    }

    public getRegisterSPValue() {
        return this.getRegisterValue("SP");
    }

    public setRegisterSPValue(value: number) {
        this.setRegisterValue("SP", value);
    }

    public getProgramCounter() {
        return this.PC;
    }

    public increaseProgramCounter(value = 1) {
        this.PC += value;
    }

    public enableInterrupts() {
        this.interruptsEnabled = true;
    }

    public disableInterrupts() {
        this.interruptsEnabled = false;
    }

    public areInterruptsEnabled() {
        return this.interruptsEnabled;
    }
}

export default CPU;