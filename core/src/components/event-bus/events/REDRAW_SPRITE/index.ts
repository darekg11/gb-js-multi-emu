import EVENT_TYPES from "../types";

interface REDRAW_SPRITE_EVENT_DATA {
    x: number,
    y: number
}

interface REDRAW_SPRITE_EVENT {
    type: EVENT_TYPES.REDRAW_SPRITE,
    data: REDRAW_SPRITE_EVENT_DATA
}

interface REDRAW_SPRITE_EVENT_HANDLER {
    type: EVENT_TYPES.REDRAW_SPRITE,
    callback: (data: REDRAW_SPRITE_EVENT_DATA) => void
}

export {
    REDRAW_SPRITE_EVENT,
    REDRAW_SPRITE_EVENT_DATA,
    REDRAW_SPRITE_EVENT_HANDLER
}