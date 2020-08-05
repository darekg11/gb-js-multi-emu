import _ from "lodash";
import Cartridge from "./cartridge";

describe("initializeProgramName", () => {
    test("Should read program name and store it in class variable", () => {
        const EXAMPLE_PROGRAM = _.range(0x134);
        EXAMPLE_PROGRAM.push(...[
            0x54, 0x45, 0x54, 0x52, 0x49, 0x53, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ]);

        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getProgramName()).toBe("TETRIS");
    })
});

describe("initializeProgramManufacturerCode", () => {
    test("Should read program manufacturer code and store it in class variable", () => {
        const EXAMPLE_PROGRAM = _.range(0x13F);
        EXAMPLE_PROGRAM.push(...[
            0x54, 0x45, 0x53, 0x54
        ]);

        const program = new Cartridge(EXAMPLE_PROGRAM);

        expect(program.getProgramManufacturerCode()).toBe("TEST");
    })
});