import { createContext } from 'react';

const DEFAULT_STATE = {
    romName: ""
}
const EmulatorStateContext = createContext(DEFAULT_STATE);
export {
    EmulatorStateContext,
    DEFAULT_STATE
}