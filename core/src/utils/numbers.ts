const combineTwo8BitsNumbersInto16BitsNumber = (a: number, b: number): number => {
    // first shift to the left, making second half filled with 0
    // then AND it with second value
    return a << 8 | b;
}

const split16BitsNumberIntoTwo8BitsNumbers = (value: number): [number, number] => {
    // get only bits from first half, 0 rest
    // so you get 1111 1111 0000 0000
    const firstHalf = value & 0xFF00;
    // drop remaining 0 from previous operation
    // so you get 1111 1111
    const first = firstHalf >> 8;
    // get only second half
    const second = value & 0xFF;
    return [ first, second ];
}

const isBitSet = (value: number, bit: number) => {
    return  (value & (1 << bit)) !== 0;
}

const setBit = (value: number, bit: number) => {
    return value | (1 << bit);
}

const unsetBit = (value: number, bit: number) => {
    return value & (~(1 << bit));
}

export {
    combineTwo8BitsNumbersInto16BitsNumber,
    split16BitsNumberIntoTwo8BitsNumbers,
    isBitSet,
    setBit,
    unsetBit
};