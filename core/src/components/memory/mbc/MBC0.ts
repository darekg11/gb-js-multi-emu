import { numberUtils } from "../../../utils";
import BaseMBC from "./base";

class MBC_0 extends BaseMBC {
    private memory = new Uint8Array();

    constructor (romBanksCount: number, ramSizeBytes: number, memory: Uint8Array) {
        super(romBanksCount, ramSizeBytes);
        this.memory = memory;
    }

    public write8BitsValue = (index: number, value: number) => {
        // MBC 0 - don't allow to write to ROM.
        // MBC 0 also do not support switching banks so we don't need any other logic here
        if (index < 0x8000) {
            return;
        }

        this.memory[index] = value;
    }

    public read8BitsValue = (index: number) => {
        return this.memory[index];
    }

    public write16BitsValue = (index: number, value: number) => {
        // MBC 0 - don't allow to write to ROM.
        // MBC 0 also do not support switching banks so we don't need any other logic here
        if (index < 0x8000) {
            return;
        }

        const [ firstPart, secondPart ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
        this.memory[index] = secondPart;
        this.memory[index + 1] = firstPart;
    }

    public read16BitsValue = (index: number) => {
        const firstPart = this.memory[index + 1];
        const secondPart = this.memory[index];
        return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstPart, secondPart);
    }
}

export default MBC_0;