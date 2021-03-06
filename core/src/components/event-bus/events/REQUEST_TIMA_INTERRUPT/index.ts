import EVENT_TYPES from "../types";

interface REQUEST_TIMA_INTERRUPT_EVENT_DATA {};

interface REQUEST_TIMA_INTERRUPT_EVENT {
    type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
    data: REQUEST_TIMA_INTERRUPT_EVENT_DATA
}

interface REQUEST_TIMA_INTERRUPT_EVENT_HANDLER {
    type: EVENT_TYPES.REQUEST_TIMA_INTERRUPT,
    callback: (data: REQUEST_TIMA_INTERRUPT_EVENT_DATA) => void
}

class RequestTimaInterruptEvent implements REQUEST_TIMA_INTERRUPT_EVENT {
    type: number = EVENT_TYPES.REQUEST_TIMA_INTERRUPT;
    data = {};
}

export {
    REQUEST_TIMA_INTERRUPT_EVENT,
    REQUEST_TIMA_INTERRUPT_EVENT_DATA,
    REQUEST_TIMA_INTERRUPT_EVENT_HANDLER,
    RequestTimaInterruptEvent
}