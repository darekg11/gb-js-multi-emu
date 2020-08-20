import _ from "lodash";
import Cartridge from "./cartridge";

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