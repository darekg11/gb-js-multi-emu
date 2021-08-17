import MBCFactory from "./index";
import UnsupportedCartridgeTypeError from "../../../errors/UnsupportedCartridgeTypeError";
import { RAM_SIZE_INDEX, ROM_SIZE_INDEX, CARTRIDGE_TYPE_INDEX } from "../../cartridge/constants";
import { CARTRIGDE_TYPES, RAM_SIZE, ROM_SIZES } from "../../cartridge/types";
import MBC_0 from "./MBC0";

describe("create", () => {
    test("creating unsupported MBC Type should throw UnsupportedCartridgeTypeError", () => {
        const memory = new Uint8Array(1024);
        memory[RAM_SIZE_INDEX] = RAM_SIZE.TWO_KILOBYTES;
        memory[ROM_SIZE_INDEX] = ROM_SIZES.EIGHT_BANKS;
        memory[CARTRIDGE_TYPE_INDEX] = CARTRIGDE_TYPES.MBC_7_SENSOR_RUMBLE_RAM_BATTERY;
        const factory = new MBCFactory(memory);

        expect(() => { factory.create() }).toThrow(UnsupportedCartridgeTypeError);
    });

    test("should create MBC_0 with correct configuration of RAM and ROM", () => {
        const memory = new Uint8Array(1024);
        memory[RAM_SIZE_INDEX] = RAM_SIZE.THIRTY_TWO_KILOBYTES;
        memory[ROM_SIZE_INDEX] = ROM_SIZES.SIXTY_FOUR_BANKS;
        memory[CARTRIDGE_TYPE_INDEX] = CARTRIGDE_TYPES.ROM_ONLY;
        const factory = new MBCFactory(memory);

        const mbc = factory.create();
        mbc.changeROMBank(63);
        mbc.enableRAM();
        mbc.writeToRAM(42000, 5);

        expect(mbc).toBeInstanceOf(MBC_0);
        expect(mbc.getROMBank()).toBe(63);
        expect(mbc.readFromRAM(42000)).toBe(5);
    });
});