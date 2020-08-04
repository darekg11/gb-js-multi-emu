import { CARTRIGDE_TYPES, ROM_SIZES, RAM_SIZE, DESTINATION_CODES } from "./types";

class Cartridge {

    // Cartridge raw data bytes
    private programData = new Uint8Array(0);

    // Program Name - max 11 characters
    private programName: string = "";

    // Manufacturer Code - max 4 characters
    private programManufacturerCode: string = "";

    // If cartridge is suppose to be launched in Gameboy Color
    private isCGB: boolean = false;

    // If cartidge uses Super Gamemboy features
    private isSGB: boolean = false;

    // 1 character long on older ROMs
        // A value of 33h signalizes that the New License Code in header bytes 0x144-0x145 is used instead.
    // 2 characters long on newer ROMs
    private licenseCode: string = "";

    // cartridge type - MBC1 / MBC2 / etc
    private cartridgeType: CARTRIGDE_TYPES = CARTRIGDE_TYPES.UNKNOWN;

    // ROM Size of cartridge - # of banks
    private romSize: ROM_SIZES = ROM_SIZES.UNKNOWN;

    // RAM size of external RAM on cartridge
    private ramSize: RAM_SIZE = RAM_SIZE.UNKNOWN

    // Specifies where cartridge where suppose to be sold - Japanese / No-Japanese
    private destinationCode: DESTINATION_CODES = DESTINATION_CODES.UNKNOWN

    constructor(data = []) {
        this.programData = new Uint8Array(data);
    }
}