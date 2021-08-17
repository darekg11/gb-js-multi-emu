import UnsupportedCartridgeTypeError from "../../../errors/UnsupportedCartridgeTypeError";
import { RAM_SIZE_INDEX, ROM_SIZE_INDEX, CARTRIDGE_TYPE_INDEX } from "../../cartridge/constants";
import { CARTRIGDE_TYPES, RAM_SIZE, ROM_SIZES } from "../../cartridge/types";
import BaseMBC from "./base";
import MBC_0 from "./MBC0";

class MBCFactory {
    // count of available ROM banks count
    private romBanksCount = 2;

    // size of single RAM Bank in bytes
    private ramSizeBytes = 0;

    // MBC type
    private type = CARTRIGDE_TYPES.ROM_ONLY;

    private memory = new Uint8Array();

    private MEMORY_VALUE_TO_ROM_BAKNS_COUNT_MAP = {
        [ROM_SIZES.NO_ROM_BANKING]: 2, // there are always 2 ROM banks by default
        [ROM_SIZES.FOUR_BANKS]: 4,
        [ROM_SIZES.EIGHT_BANKS]: 8,
        [ROM_SIZES.SIXTEEN_BANKS]: 16,
        [ROM_SIZES.THIRTY_TWO_BANKS]: 32,
        [ROM_SIZES.SIXTY_FOUR_BANKS]: 64,
        [ROM_SIZES.ONE_HUNDRED_TWENTY_EIGHT_BANKS]: 128,
        [ROM_SIZES.TWO_HUNDRED_FIFTY_SIX_BANKS]: 256,
        [ROM_SIZES.FIVE_HUNDRED_TWELVE_BANKS]: 512,
        [ROM_SIZES.SEVENTY_TWO_BANKS]: 72,
        [ROM_SIZES.EIGHTY_BANKS]: 80,
        [ROM_SIZES.NINETY_SIX_BANKS]: 96
    }

    private MEMORY_VALUE_TO_RAM_SIZE_BYTES_MAP = {
        [RAM_SIZE.NONE]: 0,
        [RAM_SIZE.TWO_KILOBYTES]: 2048,
        [RAM_SIZE.EIGHT_KILOBYTES]: 8192,
        [RAM_SIZE.THIRTY_TWO_KILOBYTES]: 32768,
        [RAM_SIZE.SIXTY_FOUR_KILOBYTES]: 65536,
        [RAM_SIZE.ONE_HUNDRED_TWENTY_EIGHT_KILOBYTES]: 131072
    }

    constructor (memory: Uint8Array) {
        this.memory = memory;
        this.romBanksCount = this.mapRomBankCountFromMemory();
        this.ramSizeBytes = this.mapRamSizeFromMemory();
        this.type = this.memory[CARTRIDGE_TYPE_INDEX]
    }

    private mapRomBankCountFromMemory () {
        const romBankCountValue = this.memory[ROM_SIZE_INDEX] as ROM_SIZES;
        return this.MEMORY_VALUE_TO_ROM_BAKNS_COUNT_MAP[romBankCountValue] || 2;
    }

    private mapRamSizeFromMemory () {
        const ramSizeValue = this.memory[RAM_SIZE_INDEX] as RAM_SIZE;
        return this.MEMORY_VALUE_TO_RAM_SIZE_BYTES_MAP[ramSizeValue] || 0;
    }

    public create (): BaseMBC {
        if (this.type === CARTRIGDE_TYPES.ROM_ONLY) {
            return new MBC_0(this.romBanksCount, this.ramSizeBytes, this.memory);
        }
        throw new UnsupportedCartridgeTypeError(this.type);
    }
}

export default MBCFactory;