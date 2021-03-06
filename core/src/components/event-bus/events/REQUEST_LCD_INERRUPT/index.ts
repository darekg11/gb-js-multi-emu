import EVENT_TYPES from "../types";

interface REQUEST_LCD_INTERRUPT_EVENT_DATA {};

interface REQUEST_LCD_INTERRUPT_EVENT {
    type: EVENT_TYPES.REQUEST_LCD_INTERRUPT,
    data: REQUEST_LCD_INTERRUPT_EVENT_DATA
}

interface REQUEST_LCD_INTERRUPT_EVENT_HANDLER {
    type: EVENT_TYPES.REQUEST_LCD_INTERRUPT,
    callback: (data: REQUEST_LCD_INTERRUPT_EVENT_DATA) => void
}

class RequestLCDInterruptEvent implements REQUEST_LCD_INTERRUPT_EVENT {
    type: number = EVENT_TYPES.REQUEST_LCD_INTERRUPT;
    data = {};
}

export {
    REQUEST_LCD_INTERRUPT_EVENT,
    REQUEST_LCD_INTERRUPT_EVENT_DATA,
    REQUEST_LCD_INTERRUPT_EVENT_HANDLER,
    RequestLCDInterruptEvent
}