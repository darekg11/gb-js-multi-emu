import { CPU_REGISTERS, ICPURegisters } from "./types";
import { numberUtils } from "../../utils";
import Memory from "../memory/memory";
import NON_PREIFX_JUMP_TABLE from "./JumpTableNonPrefix";
import CB_PREFIX_JUMP_TABLE from "./JumpTableCBPrefix";

const ZERO_FLAG_BIT = 7;
const SUBTRACTION_FLAG_BIT = 6;
const HALF_CARRY_FLAG_BIT = 5;
const CARRY_FLAG_BIT = 4;

class CPU {
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

    private interruptsEnabled: boolean = false;
    private halted: boolean = false;

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
            this.registers.F = F & 0b11110000;
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
            this.SP = this.SP & 0xFFFF;
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
        // Register F value can only save higher 4 bits
        // Lower 4 bits should never be set
        this.setRegisterValue("F", value & 0b11110000);
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

    public jump(address: number) {
        this.PC = address & 0xFFFF;
    }

    public getProgramCounter() {
        return this.PC;
    }

    public increaseProgramCounter(value = 1) {
        this.PC += value;
        this.PC = this.PC & 0xFFFF;
    }

    public increaseStackPointer(value = 1) {
        this.SP += value;
        this.SP = this.SP & 0xFFFF;
    }

    public decreaseStackPointer(value = 1) {
        this.SP -= value;
        this.SP = this.SP & 0xFFFF;
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

    public isZeroFlagSet() {
        return numberUtils.isBitSet(this.registers.F, ZERO_FLAG_BIT);
    }

    public setZeroFlag() {
        this.registers.F = numberUtils.setBit(this.registers.F, ZERO_FLAG_BIT);
    }

    public unsetZeroFlag() {
        this.registers.F = numberUtils.unsetBit(this.registers.F, ZERO_FLAG_BIT);
    }

    public isSubtractionFlagSet() {
        return numberUtils.isBitSet(this.registers.F, SUBTRACTION_FLAG_BIT);
    }

    public setSubtractionFlag() {
        this.registers.F = numberUtils.setBit(this.registers.F, SUBTRACTION_FLAG_BIT);
    }

    public unsetSubtractionFlag() {
        this.registers.F = numberUtils.unsetBit(this.registers.F, SUBTRACTION_FLAG_BIT);
    }

    public isHalfCarryFlagSet() {
        return numberUtils.isBitSet(this.registers.F, HALF_CARRY_FLAG_BIT);
    }

    public setHalfCarryFlag() {
        this.registers.F = numberUtils.setBit(this.registers.F, HALF_CARRY_FLAG_BIT);
    }

    public unsetHalfCarryFlag() {
        this.registers.F = numberUtils.unsetBit(this.registers.F, HALF_CARRY_FLAG_BIT);
    }

    public isCarryFlagSet() {
        return numberUtils.isBitSet(this.registers.F, CARRY_FLAG_BIT);
    }

    public setCarryFlag() {
        this.registers.F = numberUtils.setBit(this.registers.F, CARRY_FLAG_BIT);
    }

    public unsetCarryFlag() {
        this.registers.F = numberUtils.unsetBit(this.registers.F, CARRY_FLAG_BIT);
    }

    public isHalted() {
        return this.halted;
    }

    public halt() {
        this.halted = true;
    }

    public unhalt() {
        this.halted = false;
    }

    // Executes single CPU tick
    // Returns number of machine cycles that it took
    public tick(memory: Memory): number {
        if (this.halted) {
            // when CPU is halted it should increase ticks - it just should not execute instructions
            return 4;
        }

        let opCode = memory.read8BitsValue(this.PC);
        const isCB = opCode === 0xCB;
        const jumpTableToUse = isCB ? CB_PREFIX_JUMP_TABLE : NON_PREIFX_JUMP_TABLE;
        if (isCB) {
            // read next OP Code in case of CB
            opCode = memory.read8BitsValue(this.PC + 1);
        }
        const opCodeHandler = jumpTableToUse[opCode];
        if (opCodeHandler) {
            const instructionTicks = opCodeHandler( { CPU: this, Memory: memory });
            return instructionTicks;
        } else {
            console.log("UNHANDLED OP CODE: %s. IS CB: %s, PC: %s", opCode, isCB, this.PC);
            this.increaseProgramCounter();
            // apperently some OP CODE is not defined
            return 4;
            // TODO: add logger.error call here once we have logger
        }
    }

}

export default CPU;