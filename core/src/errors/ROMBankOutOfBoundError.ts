class ROMBankOutOfBoundError extends Error {
    constructor(bankIndex?: number) {
        super(bankIndex ? `Detected out of bounds ROM Bank access at ROM Bank index: ${bankIndex}` : "Detected out of bounds ROM Bank access");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, ROMBankOutOfBoundError)
        }
        this.name = "ROMBankOutOfBoundError";
    }
}

export default ROMBankOutOfBoundError;