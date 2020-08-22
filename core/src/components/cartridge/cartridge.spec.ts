import _ from "lodash";
import Cartridge from "./cartridge";
import { CARTRIGDE_TYPES, ROM_SIZES } from "./types";
import UnsupportedCartridgeTypeError from "../../errors/UnsupportedCartridgeTypeError";
import UnsupportedCartridgeROMSizeError from "../../errors/UnsupportedCartridgeROMSizeError";

describe("initializeProgramName", () => {
    test("Should read program name and store it in class variable", () => {
        const EXAMPLE_PROGRAM = _.range(0x134);
        EXAMPLE_PROGRAM.push(...[
            0x54, 0x45, 0x54, 0x52, 0x49, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));

        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getProgramName()).toBe("TETRIS");
    })
});

describe("initializeProgramManufacturerCode", () => {
    test("Should read program manufacturer code and store it in class variable", () => {
        const EXAMPLE_PROGRAM = _.range(0x13F);
        EXAMPLE_PROGRAM.push(...[
            0x54, 0x45, 0x53, 0x54, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));

        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getProgramManufacturerCode()).toBe("TEST");
    })
});

describe("initalizeIsGameBoyColor", () => {
    test("Should set flag to false when index value is 0x00", () => {
        const EXAMPLE_PROGRAM = _.range(0x143);
        EXAMPLE_PROGRAM.push(0x00);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isCGB()).toBeFalsy();
    });

    test("Should set flag to false when index value is 0x80", () => {
        const EXAMPLE_PROGRAM = _.range(0x143);
        EXAMPLE_PROGRAM.push(0x80);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isCGB()).toBeFalsy();
    });

    test("Should set flag to true when index value is 0xC0", () => {
        const EXAMPLE_PROGRAM = _.range(0x143);
        EXAMPLE_PROGRAM.push(0xC0);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isCGB()).toBeTruthy();
    });

    test("Should set flag to false when index value is non default value", () => {
        const EXAMPLE_PROGRAM = _.range(0x143);
        EXAMPLE_PROGRAM.push(0xDD);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isCGB()).toBeFalsy();
    });
});

describe("initializeIsSuperGameBoy", () => {
    test("Should set flag to false when index value is 0x00", () => {
        const EXAMPLE_PROGRAM = _.range(0x146);
        EXAMPLE_PROGRAM.push(0x00);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isSGB()).toBeFalsy();
    });

    test("Should set flag to true when index value is 0x03", () => {
        const EXAMPLE_PROGRAM = _.range(0x146);
        EXAMPLE_PROGRAM.push(0x03);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isSGB()).toBeTruthy();
    });

    test("Should set flag to false when index value is non default value", () => {
        const EXAMPLE_PROGRAM = _.range(0x146);
        EXAMPLE_PROGRAM.push(0xDD);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.isSGB()).toBeFalsy();
    });
});


describe("initializeLicenseCode", () => {
    test("Should retrieve old license code", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x00, 0x00, 0x00
        ]);
        EXAMPLE_PROGRAM.push(0x88);
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getLicenseCode()).toBe("88");
    });

    test("Should retrieve new license code", () => {
        const EXAMPLE_PROGRAM = _.range(0x144);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x33
        ]);
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getLicenseCode()).toBe("01");
    });
});

describe("initializeCartrideType", () => {
    test("Value of 0x00 should set ROM_ONLY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x00);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.ROM_ONLY);
    });

    test("Value of 0x01 should set MBC_1 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x01);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_1);
    });

    test("Value of 0x02 should set MBC_1_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x02);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_1_RAM);
    });

    test("Value of 0x03 should set MBC_1_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x03);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_1_RAM_BATTERY);
    });

    test("Value of 0x05 should set MBC_2 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x05);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_2);
    });

    test("Value of 0x06 should set MBC_2_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x06);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_2_BATTERY);
    });

    test("Value of 0x08 should set ROM_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x08);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.ROM_RAM);
    });

    test("Value of 0x09 should set ROM_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x09);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.ROM_RAM_BATTERY);
    });

    test("Value of 0x0B should set MMM01 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x0B);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MMM_01);
    });

    test("Value of 0x0C should set MMM01_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x0C);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MMM_01_RAM);
    });

    test("Value of 0x0D should set MMM01_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x0D);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MMM_01_RAM_BATTERY);
    });

    test("Value of 0x0F should set MBC3_TIMER_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x0F);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_3_TIMER_BATTERY);
    });

    test("Value of 0x10 should set MBC3_TIMER_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x10);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_3_TIMER_RAM_BATTERY);
    });

    test("Value of 0x11 should set MBC3 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x11);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_3);
    });

    test("Value of 0x12 should set MBC3_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x12);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_3_RAM);
    });

    test("Value of 0x13 should set MBC3_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x13);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_3_RAM_BATTERY);
    });

    test("Value of 0x19 should set MBC5 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x19);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5);
    });

    test("Value of 0x1A should set MBC5_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x1A);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5_RAM);
    });

    test("Value of 0x1B should set MBC5_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x1B);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5_RAM_BATTERY);
    });

    test("Value of 0x1C should set MBC5_RUMBLE type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x1C);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5_RUMBLE);
    });

    test("Value of 0x1D should set MBC5_RUMBLE_RAM type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x1D);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM);
    });

    test("Value of 0x1E should set MBC5_RUMBLE_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x1E);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_5_RUMBLE_RAM_BATTERY);
    });

    test("Value of 0x20 should set MBC6 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x20);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_6);
    });

    test("Value of 0x22 should set MBC_7_SENSOR_RUMBLE_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0x22);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.MBC_7_SENSOR_RUMBLE_RAM_BATTERY);
    });

    test("Value of 0xFC should set POCKET_CAMERA type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0xFC);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.POCKET_CAMERA);
    });

    test("Value of 0xFD should set BANDAI_TAMA_5 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0xFD);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.BANDAI_TAMA_5);
    });

    test("Value of 0xFE should set HUC_3 type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0xFE);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.HUC_3);
    });

    test("Value of 0xFF should set HUC_1_RAM_BATTERY type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0xFF);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getCartridgeType()).toBe(CARTRIGDE_TYPES.HUC_1_RAM_BATTERY);
    });

    test("Not suported value should throw error", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(0xDD);
        EXAMPLE_PROGRAM.push(..._.range(0x400));

        expect(() => new Cartridge(EXAMPLE_PROGRAM)).toThrowError(UnsupportedCartridgeTypeError);
    });
});

describe("initializeROMSize", () => {
    test("Value of 0x00 should set NO_ROM_BANKING type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x00
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.NO_ROM_BANKING);
    });

    test("Value of 0x01 should set FOUR_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x01
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.FOUR_BANKS);
    });

    test("Value of 0x02 should set EIGHT_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x02
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.EIGHT_BANKS);
    });

    test("Value of 0x03 should set SIXTEEN_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x03
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.SIXTEEN_BANKS);
    });

    test("Value of 0x04 should set THIRTY_TWO_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x04
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.THIRTY_TWO_BANKS);
    });

    test("Value of 0x05 should set SIXTY_FOUR_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x05
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.SIXTY_FOUR_BANKS);
    });

    test("Value of 0x06 should set ONE_HUNDRED_TWENTY_EIGHT_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x06
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.ONE_HUNDRED_TWENTY_EIGHT_BANKS);
    });

    test("Value of 0x07 should set TWO_HUNDRED_FIFTY_SIX_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x07
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.TWO_HUNDRED_FIFTY_SIX_BANKS);
    });

    test("Value of 0x08 should set FIVE_HUNDRED_TWELVE_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x08
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.FIVE_HUNDRED_TWELVE_BANKS);
    });

    test("Value of 0x52 should set SEVENTY_TWO_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x52
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.SEVENTY_TWO_BANKS);
    });

    test("Value of 0x53 should set EIGHTY_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x53
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.EIGHTY_BANKS);
    });

    test("Value of 0x54 should set NINETY_SIX_BANKS type", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0x54
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));
        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getRomSize()).toBe(ROM_SIZES.NINETY_SIX_BANKS);
    });

    test("Not suported value should throw error", () => {
        const EXAMPLE_PROGRAM = _.range(0x147);
        EXAMPLE_PROGRAM.push(...[
            0x00, 0xDD
        ]);
        EXAMPLE_PROGRAM.push(..._.range(0x400));

        expect(() => new Cartridge(EXAMPLE_PROGRAM)).toThrowError(UnsupportedCartridgeROMSizeError);
    });
});