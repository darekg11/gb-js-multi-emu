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