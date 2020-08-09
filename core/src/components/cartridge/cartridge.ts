import { CARTRIGDE_TYPES, ROM_SIZES, RAM_SIZE, DESTINATION_CODES } from "./types";

const PROGRAM_NAME_START_INDEX = 0x134;
const PROGRAM_NAME_END_INDEX = 0x13F;

const PROGRAM_MANUFACTURER_CODE_START_INDEX = 0x13F;
const PROGRAM_MANUFACTURER_CODE_END_INDEX = 0x143;
const GBC_FLAG_INDEX = 0x143;
const OLD_LICENSE_CODE_INDEX = 0x14B;
const NEW_LICENSE_FLAG_VALUE = 0x33;
const NEW_LICENSE_START_INDEX = 0x144;
const NEW_LICENSE_END_INDEX = 0x145;

class Cartridge {

    // Cartridge raw data bytes
    private programData = new Uint8Array(0);

    // Program Name - max 11 characters
    private programName: string = "";

    // Manufacturer Code - max 4 characters
    private programManufacturerCode: string = "";

    // If cartridge is suppose to be launched in Gameboy Color
    private gcb: boolean = false;

    // If cartidge uses Super Gamemboy features
    private sgb: boolean = false;

    // 1 character long on older ROMs
        // A value of 33h signalizes that the New License Code in header bytes 0x144-0x145 is used instead.
    // 2 characters long on newer ROMs
    private licenseCode: string = "";

    // cartridge type - MBC1 / MBC2 / etc
    private cartridgeType: CARTRIGDE_TYPES = CARTRIGDE_TYPES.ROM_ONLY;

    // ROM Size of cartridge - # of banks
    private romSize: ROM_SIZES = ROM_SIZES.NO_ROM_BANKING;

    // RAM size of external RAM on cartridge
    private ramSize: RAM_SIZE = RAM_SIZE.NONE

    // Specifies where cartridge where suppose to be sold - Japanese / No-Japanese
    private destinationCode: DESTINATION_CODES = DESTINATION_CODES.NON_JAPANESE

    constructor(data: number[] = []) {
        this.programData = new Uint8Array(data);
        this.initialize();
    }

    public getProgramData = (): Uint8Array => {
        return this.programData;
    }

    public getProgramName = (): string => {
        return this.programName;
    }

    public getProgramManufacturerCode = (): string => {
        return this.programManufacturerCode;
    }

    public isCGB = (): boolean => {
        return this.gcb;
    }

    public isSGB = (): boolean => {
        return this.sgb;
    }

    public getLicenseCode = (): string => {
        return this.licenseCode;
    }

    public getCartridgeType = (): CARTRIGDE_TYPES => {
        return this.cartridgeType;
    }

    public getRomSize = (): ROM_SIZES => {
        return this.romSize;
    }

    public getRamSize = (): RAM_SIZE => {
        return this.ramSize;
    }

    public getDestinationCode = (): DESTINATION_CODES => {
        return this.destinationCode;
    }

    private initializeProgramName = () => {
        const charCodes = [];
        for (let index = PROGRAM_NAME_START_INDEX; index < PROGRAM_NAME_END_INDEX; index++) {
            if (this.programData[index] > 0) {
                charCodes.push(this.programData[index]);
            }
        }

        this.programName = String.fromCharCode(...charCodes);
    }

    private initializeProgramManufacturerCode = () => {
        const charCodes = [];
        for (let index = PROGRAM_MANUFACTURER_CODE_START_INDEX; index < PROGRAM_MANUFACTURER_CODE_END_INDEX; index++) {
            if (this.programData[index] > 0) {
                charCodes.push(this.programData[index]);
            }
        }

        this.programManufacturerCode = String.fromCharCode(...charCodes);
    }

    private initalizeIsGameBoyColor = () => {
        const gameBoyColorFlag = this.programData[GBC_FLAG_INDEX];
        if (gameBoyColorFlag === 0x00) {
            this.gcb = false;
            return;
        }
        if (gameBoyColorFlag === 0x80) {
            this.gcb = false;
            return;
        }
        if (gameBoyColorFlag === 0xC0) {
            this.gcb = true;
            return;
        }
        this.gcb = false;
    }

    private initializeLicenseCode = () => {
        const oldLicenseValue = this.programData[OLD_LICENSE_CODE_INDEX];
        if (oldLicenseValue === NEW_LICENSE_FLAG_VALUE) {
            this.licenseCode = this.programData[NEW_LICENSE_START_INDEX].toString() + this.programData[NEW_LICENSE_END_INDEX].toString();
        } else {
            this.licenseCode = oldLicenseValue.toString(16);
        }
    }

    private initialize = () => {
        this.initializeProgramName();
        this.initializeProgramManufacturerCode();
        this.initalizeIsGameBoyColor();
        this.initializeLicenseCode();
    }
}

export default Cartridge;