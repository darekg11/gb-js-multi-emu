import Memory from "../../memory";

interface IRenderer {
    drawScanLine (memory: Memory): Uint8ClampedArray
}

export default IRenderer;