import MBC_0 from "./MBC0";

describe("write8BitsValue + read8BitsValue", () => {
    test("writing to index below 0x8000 should not persist value since it's ROM area", () => {
        const memory = new Uint8Array(20000);
        const mbc = new MBC_0(2, 0, memory);

        mbc.write8BitsValue(2000, 10);

        expect(mbc.read8BitsValue(2000)).toBe(0);
    });

    test("writing to index above or equal 0x8000 should persist value since it's not ROM area", () => {
        const memory = new Uint8Array(40000);
        const mbc = new MBC_0(2, 0, memory);

        mbc.write8BitsValue(0x8000, 22);
        mbc.write8BitsValue(0x8001, 55);

        expect(mbc.read8BitsValue(0x8000)).toBe(22);
        expect(mbc.read8BitsValue(0x8001)).toBe(55);
    });
});

describe("write16BitsValue + read16BitsValue", () => {
    test("writing to index below 0x8000 should not persist value since it's ROM area", () => {
        const memory = new Uint8Array(20000);
        const mbc = new MBC_0(2, 0, memory);

        mbc.write16BitsValue(2000, 65001);

        expect(mbc.read16BitsValue(2000)).toBe(0);
    });

    test("writing to index above or equal 0x8000 should persist value since it's not ROM area", () => {
        const memory = new Uint8Array(40000);
        const mbc = new MBC_0(2, 0, memory);

        mbc.write16BitsValue(0x8000, 65001);

        expect(mbc.read16BitsValue(0x8000)).toBe(65001);
    });
});