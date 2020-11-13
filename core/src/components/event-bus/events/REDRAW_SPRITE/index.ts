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

class RedrawSpriteEvent implements REDRAW_SPRITE_EVENT {
    type: number = EVENT_TYPES.REDRAW_SPRITE;
    data: REDRAW_SPRITE_EVENT_DATA = { x: 0, y: 0 };
    constructor (x: number, y: number) {
        this.data = {
            x,
            y
        }
    }
}

export {
    REDRAW_SPRITE_EVENT,
    REDRAW_SPRITE_EVENT_DATA,
    REDRAW_SPRITE_EVENT_HANDLER,
    RedrawSpriteEvent
}