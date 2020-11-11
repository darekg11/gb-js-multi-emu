import { IBusEventHandlers, EVENTS, EVENT_HANDLERS } from "./types";

class EventBus {
    private handlers: IBusEventHandlers = {};

    public addHandler = (handler: EVENT_HANDLERS) => {
        this.handlers[handler.type] = [ handler.callback];
    };

    public emit = (event: EVENTS) => {
        const callbacks = this.handlers[event.type] || [];
        callbacks.forEach(handler => {
            handler(event.data);
        });
    }
}

export default EventBus;