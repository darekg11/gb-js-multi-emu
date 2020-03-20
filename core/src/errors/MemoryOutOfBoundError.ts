class MemoryOutOfBoundError extends Error {
    constructor(indexMemory?: number) {
        super(indexMemory ? `Detected out of bounds memory access at index: ${indexMemory}` : "Detected out of bounds memory access");
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, MemoryOutOfBoundError)
        }
        this.name = "MemoryOutOfBoundError";
    }
}

export default MemoryOutOfBoundError;