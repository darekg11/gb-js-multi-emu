import EVENT_TYPES from "../types";

interface REQUEST_VBLANK_INTERRUPT_EVENT_DATA {
    buffer: Uint8ClampedArray
};

interface REQUEST_VBLANK_INTERRUPT_EVENT {
    type: EVENT_TYPES.REQUEST_VBLANK_INTERRUPT,
    data: REQUEST_VBLANK_INTERRUPT_EVENT_DATA
}

interface REQUEST_VBLANK_INTERRUPT_EVENT_HANDLER {
    type: EVENT_TYPES.REQUEST_VBLANK_INTERRUPT,
    callback: (data: REQUEST_VBLANK_INTERRUPT_EVENT) => void
}

class RequestVBLANKInterruptEvent implements REQUEST_VBLANK_INTERRUPT_EVENT {
    type: number = EVENT_TYPES.REQUEST_VBLANK_INTERRUPT;
    data = {
        buffer: new Uint8ClampedArray()
    }
    constructor(buffer: Uint8ClampedArray) {
        this.data = {
            buffer
        }
    }
}

export {
    REQUEST_VBLANK_INTERRUPT_EVENT,
    REQUEST_VBLANK_INTERRUPT_EVENT_DATA,
    REQUEST_VBLANK_INTERRUPT_EVENT_HANDLER,
    RequestVBLANKInterruptEvent
}