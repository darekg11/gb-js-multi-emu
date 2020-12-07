import Memory from "../../memory";

interface IRenderer {
    drawScanLine (memory: Memory): Uint8ClampedArray
}

interface IColor {
    red: number,
    green: number,
    blue: number,
    alpha: number
}

export { IRenderer, IColor };