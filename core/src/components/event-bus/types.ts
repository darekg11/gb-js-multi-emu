import EVENT_TYPES from "./events/types";
import { UNMAP_BIOS_EVENT, UNMAP_BIOS_EVENT_HANDLER } from "./events/UNMAP_BIOS";
import { REDRAW_SPRITE_EVENT, REDRAW_SPRITE_EVENT_HANDLER } from "./events/REDRAW_SPRITE";

type EVENT_HANDLERS = UNMAP_BIOS_EVENT_HANDLER | REDRAW_SPRITE_EVENT_HANDLER;
type EVENTS = UNMAP_BIOS_EVENT | REDRAW_SPRITE_EVENT;
type CALLBACK = (data: any) => void

interface IBusEventHandlers {
    [index: string]: CALLBACK[]
}


export {
    EVENT_TYPES,
    IBusEventHandlers,
    EVENTS,
    EVENT_HANDLERS
};