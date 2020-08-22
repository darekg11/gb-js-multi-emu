import { CARTRIGDE_TYPES, ROM_SIZES, RAM_SIZE, DESTINATION_CODES } from "./types";
import UnsupportedCartridgeTypeError from "../../errors/UnsupportedCartridgeTypeError";
import UnsupportedCartridgeROMSizeError from "../../errors/UnsupportedCartridgeROMSizeError";
import UnsupportedCartridgeRAMSizeError from "../../errors/UnsupportedCartridgeRAMSizeError";

const PROGRAM_NAME_START_INDEX = 0x134;
const PROGRAM_NAME_END_INDEX = 0x13F;

const PROGRAM_MANUFACTURER_CODE_START_INDEX = 0x13F;
const PROGRAM_MANUFACTURER_CODE_END_INDEX = 0x143;
const GBC_FLAG_INDEX = 0x143;
const SGB_FLAG_INDEX = 0x146;
const OLD_LICENSE_CODE_INDEX = 0x14B;
const NEW_LICENSE_FLAG_VALUE = 0x33;
const NEW_LICENSE_START_INDEX = 0x144;
const NEW_LICENSE_END_INDEX = 0x145;
const CARTRIDGE_TYPE_INDEX = 0x147;
const ROM_SIZE_INDEX = 0x148;
const RAM_SIZE_INDEX = 0x149;
const DESTINATION_CODE_INDEX = 0x14A;

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

    private initializeIsSuperGameBoy = () => {
        const superGameBoyFlag = this.programData[SGB_FLAG_INDEX];
        if (superGameBoyFlag === 0x00) {
            this.sgb = false;
            return;
        }
        if (superGameBoyFlag === 0x03) {
            this.sgb = true;
            return;
        }
        this.sgb = false;
    }

    private initializeLicenseCode = () => {
        const oldLicenseValue = this.programData[OLD_LICENSE_CODE_INDEX];
        if (oldLicenseValue === NEW_LICENSE_FLAG_VALUE) {
            this.licenseCode = this.programData[NEW_LICENSE_START_INDEX].toString() + this.programData[NEW_LICENSE_END_INDEX].toString();
        } else {
            this.licenseCode = oldLicenseValue.toString(16);
        }
    }

    private initializeCartrideType = () => {
        const cartridgeType = this.programData[CARTRIDGE_TYPE_INDEX];

        switch (cartridgeType) {
            case CARTRIGDE_TYPES.ROM_ONLY: {
                this.cartridgeType = CARTRIGDE_TYPES.ROM_ONLY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_1: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_1;
                break;
            }
            case CARTRIGDE_TYPES.MBC_1_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_1_RAM;
                break;
            }
            case CARTRIGDE_TYPES.MBC_1_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_1_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_2: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_2;
                break;
            }
            case CARTRIGDE_TYPES.MBC_2_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_2_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.ROM_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.ROM_RAM;
                break;
            }
            case CARTRIGDE_TYPES.ROM_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.ROM_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MMM_01: {
                this.cartridgeType = CARTRIGDE_TYPES.MMM_01;
                break;
            }
            case CARTRIGDE_TYPES.MMM_01_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.MMM_01_RAM;
                break;
            }
            case CARTRIGDE_TYPES.MMM_01_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MMM_01_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_3_TIMER_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_3_TIMER_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_3_TIMER_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_3_TIMER_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_3: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_3;
                break;
            }
            case CARTRIGDE_TYPES.MBC_3_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_3_RAM;
                break;
            }
            case CARTRIGDE_TYPES.MBC_3_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_3_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5_RAM;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5_RUMBLE: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5_RUMBLE;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM;
                break;
            }
            case CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.MBC_6: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_6;
                break;
            }
            case CARTRIGDE_TYPES.MBC_7_SENSOR_RUMBLE_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.MBC_7_SENSOR_RUMBLE_RAM_BATTERY;
                break;
            }
            case CARTRIGDE_TYPES.POCKET_CAMERA: {
                this.cartridgeType = CARTRIGDE_TYPES.POCKET_CAMERA;
                break;
            }
            case CARTRIGDE_TYPES.BANDAI_TAMA_5: {
                this.cartridgeType = CARTRIGDE_TYPES.BANDAI_TAMA_5;
                break;
            }
            case CARTRIGDE_TYPES.HUC_3: {
                this.cartridgeType = CARTRIGDE_TYPES.HUC_3;
                break;
            }
            case CARTRIGDE_TYPES.HUC_1_RAM_BATTERY: {
                this.cartridgeType = CARTRIGDE_TYPES.HUC_1_RAM_BATTERY;
                break;
            }
            default: {
                throw new UnsupportedCartridgeTypeError(cartridgeType);
            }
        }
    }

    private initializeROMSize = () => {
        const romSize = this.programData[ROM_SIZE_INDEX];

        switch (romSize) {
            case ROM_SIZES.NO_ROM_BANKING: {
                this.romSize = ROM_SIZES.NO_ROM_BANKING;
                break;
            }
            case ROM_SIZES.FOUR_BANKS: {
                this.romSize = ROM_SIZES.FOUR_BANKS;
                break;
            }
            case ROM_SIZES.EIGHT_BANKS: {
                this.romSize = ROM_SIZES.EIGHT_BANKS;
                break;
            }
            case ROM_SIZES.SIXTEEN_BANKS: {
                this.romSize = ROM_SIZES.SIXTEEN_BANKS;
                break;
            }
            case ROM_SIZES.THIRTY_TWO_BANKS: {
                this.romSize = ROM_SIZES.THIRTY_TWO_BANKS;
                break;
            }
            case ROM_SIZES.SIXTY_FOUR_BANKS: {
                this.romSize = ROM_SIZES.SIXTY_FOUR_BANKS;
                break;
            }
            case ROM_SIZES.ONE_HUNDRED_TWENTY_EIGHT_BANKS: {
                this.romSize = ROM_SIZES.ONE_HUNDRED_TWENTY_EIGHT_BANKS;
                break;
            }
            case ROM_SIZES.TWO_HUNDRED_FIFTY_SIX_BANKS: {
                this.romSize = ROM_SIZES.TWO_HUNDRED_FIFTY_SIX_BANKS;
                break;
            }
            case ROM_SIZES.FIVE_HUNDRED_TWELVE_BANKS: {
                this.romSize = ROM_SIZES.FIVE_HUNDRED_TWELVE_BANKS;
                break;
            }
            case ROM_SIZES.SEVENTY_TWO_BANKS: {
                this.romSize = ROM_SIZES.SEVENTY_TWO_BANKS;
                break;
            }
            case ROM_SIZES.EIGHTY_BANKS: {
                this.romSize = ROM_SIZES.EIGHTY_BANKS;
                break;
            }
            case ROM_SIZES.NINETY_SIX_BANKS: {
                this.romSize = ROM_SIZES.NINETY_SIX_BANKS;
                break;
            }
            default: {
                throw new UnsupportedCartridgeROMSizeError(romSize);
            }
        }
    }

    private initializeRAMSize = () => {
        const ramSize = this.programData[RAM_SIZE_INDEX];

        switch (ramSize) {
            case RAM_SIZE.NONE: {
                this.ramSize = RAM_SIZE.NONE;
                break;
            }
            case RAM_SIZE.TWO_KILOBYTES: {
                this.ramSize = RAM_SIZE.TWO_KILOBYTES;
                break;
            }
            case RAM_SIZE.EIGHT_KILOBYTES: {
                this.ramSize = RAM_SIZE.EIGHT_KILOBYTES;
                break;
            }
            case RAM_SIZE.THIRTY_TWO_KILOBYTES: {
                this.ramSize = RAM_SIZE.THIRTY_TWO_KILOBYTES;
                break;
            }
            case RAM_SIZE.ONE_HUNDRED_TWENTY_EIGHT_KILOBYTES: {
                this.ramSize = RAM_SIZE.ONE_HUNDRED_TWENTY_EIGHT_KILOBYTES;
                break;
            }
            case RAM_SIZE.SIXTY_FOUR_KILOBYTES: {
                this.ramSize = RAM_SIZE.SIXTY_FOUR_KILOBYTES;
                break;
            }
            default: {
                throw new UnsupportedCartridgeRAMSizeError(ramSize);
            }
        }
    }

    private initializeDestinationCode = () => {
        const destinationCode = this.programData[DESTINATION_CODE_INDEX];

        switch (destinationCode) {
            case DESTINATION_CODES.JAPANESE: {
                this.destinationCode = DESTINATION_CODES.JAPANESE;
                break;
            }
            default: {
                this.destinationCode = DESTINATION_CODES.NON_JAPANESE;
                break;
            }
        }
    }

    private initialize = () => {
        this.initializeProgramName();
        this.initializeProgramManufacturerCode();
        this.initalizeIsGameBoyColor();
        this.initializeLicenseCode();
        this.initializeIsSuperGameBoy();
        this.initializeCartrideType();
        this.initializeROMSize();
        this.initializeRAMSize();
        this.initializeDestinationCode();
        this.initializeDestinationCode();
    }
}

export default Cartridge;