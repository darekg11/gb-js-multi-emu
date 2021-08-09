class RAMBankOutOfBoundError extends Error {
    constructor(bankIndex?: number) {
        super(bankIndex ? `Detected out of bounds RAM Bank access at RAM Bank index: ${bankIndex}` : "Detected out of bounds RAM Bank access");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, RAMBankOutOfBoundError)
        }
        this.name = "RAMBankOutOfBoundError";
    }
}

export default RAMBankOutOfBoundError;