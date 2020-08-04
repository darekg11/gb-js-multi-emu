class UnsupportedCartridgeROMSizeError extends Error {
    constructor(romSizeType?: number) {
        super(romSizeType ? `ROM Size type: ${romSizeType} is not supported` : "ROM size type is not supported");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, UnsupportedCartridgeROMSizeError)
        }
        this.name = "UnsupportedCartridgeROMSizeError";
    }
}

export default UnsupportedCartridgeROMSizeError;