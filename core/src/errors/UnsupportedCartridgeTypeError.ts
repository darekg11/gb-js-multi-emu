class UnsupportedCartridgeTypeError extends Error {
    constructor(cartridgeType?: number) {
        super(cartridgeType ? `Cartridge type: ${cartridgeType} is not supported` : "Cartridge type is not supported");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, UnsupportedCartridgeTypeError)
        }
        this.name = "UnsupportedCartridgeTypeError";
    }
}

export default UnsupportedCartridgeTypeError;