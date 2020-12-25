enum BUTTONS {
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
    "START",
    "SELECT",
    "A",
    "B"
}

const BUTTONS_BITS = {
    [BUTTONS.A]: 0,
    [BUTTONS.RIGHT]: 0,
    [BUTTONS.B]: 1,
    [BUTTONS.LEFT]: 1,
    [BUTTONS.UP]: 2,
    [BUTTONS.SELECT]: 2,
    [BUTTONS.DOWN]: 3,
    [BUTTONS.START]: 3
}

export { BUTTONS, BUTTONS_BITS }