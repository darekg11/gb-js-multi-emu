import MemoryOutOfBoundError from "../../../errors/MemoryOutOfBoundError";
import RAMBankOutOfBoundError from "../../../errors/RAMBankOutOfBoundError";
import ROMBankOutOfBoundError from "../../../errors/ROMBankOutOfBoundError";

abstract class BaseMBC {

    // this is current ROM bank
    private currentROMBank = 1;

    // this is current RAM bank
    private currentRAMBank = 0;

    // is ram access enabled
    private ramEnabled = false;

    // count of available ROM banks count
    // There is always at least 2 even on MBC0
    private romBanksCount = 2;

    // count of available RAM banks count
    private ramBanksCount = 4;

    // size of single RAM Bank in bytes
    private ramSizeBytes = 0;

    // RAM array, equal to ramSizeBytes * ramBanksCount
    private ramArray = new Uint8Array();

    constructor (romBanksCount: number, ramSizeBytes: number) {
        this.romBanksCount = romBanksCount;
        this.ramSizeBytes = ramSizeBytes;
        this.ramArray = new Uint8Array(this.ramBanksCount * this.ramSizeBytes);
    }

    abstract write8BitsValue (index: number, value: number): void;

    abstract read8BitsValue (index: number): number;

    abstract read16BitsValue (index: number): number;

    abstract write16BitsValue (index: number, value: number): void;

    public changeROMBank (newROMBank: number) {
        if (newROMBank < 0 || newROMBank > this.romBanksCount - 1) {
            throw new ROMBankOutOfBoundError(newROMBank);
        }
        this.currentROMBank = newROMBank;
    }

    public getROMBank () {
        return this.currentROMBank;
    }

    public changeRAMBank (newRAMBank: number) {
        if (newRAMBank < 0 || newRAMBank > this.ramBanksCount - 1) {
            throw new RAMBankOutOfBoundError(newRAMBank);
        }
        this.currentRAMBank = newRAMBank;
    }

    public getRAMBank () {
        return this.currentRAMBank;
    }

    public enableRAM () {
        this.ramEnabled = true;
    }

    public disableRAM () {
        this.ramEnabled = false;
    }

    public isRAMEnabled () {
        return this.ramEnabled;
    }

    public readFromRAM (index: number) {
        if (!this.ramEnabled) {
            return 0;
        }
        const startOffset = this.ramSizeBytes * this.currentRAMBank;
        const readOffset = startOffset + index;
        if (readOffset < 0 || readOffset > this.ramArray.length - 1) {
            throw new MemoryOutOfBoundError(readOffset);
        }
        return this.ramArray[readOffset];
    }

    public writeToRAM (index: number, value: number) {
        if (!this.ramEnabled) {
            return;
        }
        const startOffset = this.ramSizeBytes * this.currentRAMBank;
        const writeOffset = startOffset + index;
        if (writeOffset < 0 || writeOffset > this.ramArray.length - 1) {
            throw new MemoryOutOfBoundError(writeOffset);
        }
        this.ramArray[writeOffset] = value;
    }
}

export default BaseMBC;