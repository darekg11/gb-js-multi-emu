import _ from "lodash";
import { IBusEventHandlers, EVENTS, EVENT_HANDLERS } from "./types";

class EventBus {
    private handlers: IBusEventHandlers = {};

    public addHandler = (handler: EVENT_HANDLERS) => {
        if (_.isArray(this.handlers[handler.type]) && !_.isEmpty(this.handlers[handler.type])) {
            this.handlers[handler.type].push(handler.callback);
        } else {
            this.handlers[handler.type] = [ handler.callback ];
        }
    };

    public emit = (event: EVENTS) => {
        const callbacks = this.handlers[event.type] || [];
        callbacks.forEach(handler => {
            handler(event.data);
        });
    }
}

export default EventBus;