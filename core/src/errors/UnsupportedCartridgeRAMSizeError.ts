class UnsupportedCartridgeRAMSizeError extends Error {
    constructor(romSizeType?: number) {
        super(romSizeType ? `RAM Size type: ${romSizeType} is not supported` : "RAM size type is not supported");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, UnsupportedCartridgeRAMSizeError)
        }
        this.name = "UnsupportedCartridgeRAMSizeError";
    }
}

export default UnsupportedCartridgeRAMSizeError;