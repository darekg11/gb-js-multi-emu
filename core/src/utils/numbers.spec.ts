import * as numbersUtil from "./numbers";

describe("split16BitsNumberIntoTwo8BitsNumbers", () => {
    test("should split correctly", () => {
        // 43981
        const EXAMPLE_HEX_VALUE = 0xABCD;
        const [ firstValue, secondValue ] = numbersUtil.split16BitsNumberIntoTwo8BitsNumbers(EXAMPLE_HEX_VALUE);
        expect(firstValue).toBe(171);
        expect(secondValue).toBe(205);
    })
});

describe("combineTwo8BitsNumbersInto16BitsNumber", () => {
    test("should merge correctly", () => {
        const FIRST_VALUE = 171;
        const SECOND_VALUE = 205;
        // 43981
        const EXPECTED_VALUE = 0xABCD;
        expect(numbersUtil.combineTwo8BitsNumbersInto16BitsNumber(FIRST_VALUE, SECOND_VALUE)).toBe(EXPECTED_VALUE);
    })
});

describe("flow", () => {
    test("should split and then merge together correctly", () => {
        // 43981
        const EXAMPLE_HEX_VALUE = 0xABCD;
        const [ firstValue, secondValue ] = numbersUtil.split16BitsNumberIntoTwo8BitsNumbers(EXAMPLE_HEX_VALUE);
        const result = numbersUtil.combineTwo8BitsNumbersInto16BitsNumber(firstValue, secondValue);
        expect(result).toBe(EXAMPLE_HEX_VALUE);
    })
});

describe("isBitSet", () => {
    test("should return false when bit is 0", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 0;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(false);
    });

    test("should return true when bit is 1", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 4;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(true);
    })
});

describe("setBit", () => {
    test("should set bit to 1 when bit is 0", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 0;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(false);
        const updated = numbersUtil.setBit(TEST_VALUE, TEST_BIT);
        expect(updated).toBe(TEST_VALUE + 1);
        expect(numbersUtil.isBitSet(updated, TEST_BIT)).toBe(true);
    });

    test("should set bit to 1 when bit is 1", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 4;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(true);
        const updated = numbersUtil.setBit(TEST_VALUE, TEST_BIT);
        expect(updated).toBe(TEST_VALUE);
        expect(numbersUtil.isBitSet(updated, TEST_BIT)).toBe(true);
    })
});

describe("unsetBit", () => {
    test("should set bit to 0 when bit is 1", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 4;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(true);
        const updated = numbersUtil.unsetBit(TEST_VALUE, TEST_BIT);
        expect(updated).toBe(0);
        expect(numbersUtil.isBitSet(updated, TEST_BIT)).toBe(false);
    });

    test("should set bit to 0 when bit is 0", () => {
        const TEST_VALUE = 16;
        const TEST_BIT = 0;
        expect(numbersUtil.isBitSet(TEST_VALUE, TEST_BIT)).toBe(false);
        const updated = numbersUtil.unsetBit(TEST_VALUE, TEST_BIT);
        expect(updated).toBe(TEST_VALUE);
        expect(numbersUtil.isBitSet(updated, TEST_BIT)).toBe(false);
    })
});