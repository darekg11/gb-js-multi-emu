import EVENT_TYPES from "../types";

interface UNMAP_BIOS_EVENT_DATA {};

interface UNMAP_BIOS_EVENT {
    type: EVENT_TYPES.UNAMP_BIOS,
    data: UNMAP_BIOS_EVENT_DATA
}

interface UNMAP_BIOS_EVENT_HANDLER {
    type: EVENT_TYPES.UNAMP_BIOS,
    callback: (data: UNMAP_BIOS_EVENT_DATA) => void
}

class UnmapBiosEvent implements UNMAP_BIOS_EVENT {
    type: number = EVENT_TYPES.UNAMP_BIOS;
    data = {};
}

export {
    UNMAP_BIOS_EVENT,
    UNMAP_BIOS_EVENT_DATA,
    UNMAP_BIOS_EVENT_HANDLER,
    UnmapBiosEvent
}