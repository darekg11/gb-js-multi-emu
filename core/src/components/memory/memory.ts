import { numberUtils } from "../../utils/index";
import MemoryOutOfBoundError from "../../errors/MemoryOutOfBoundError";
import EventBus from "../event-bus";
import REGISTERS from "./constants";
import { UnmapBiosEvent } from "../event-bus/events/UNMAP_BIOS";

const MEMORY_SIZE = 65535;

class Memory {
    constructor (eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    private eventBus = new EventBus();
    private memory = new Uint8Array(MEMORY_SIZE);

    public read8BitsValue = (index: number) => {
        if (index < 0 || index > this.memory.length - 1) {
            throw new MemoryOutOfBoundError(index);
        }
        return this.memory[index];
    }

    public write8BitsValue = (index: number, value: number) => {
        if (index < 0 || index > this.memory.length - 1) {
            throw new MemoryOutOfBoundError(index);
        }
        this.checkEvents(index, value);
        this.memory[index] = value;
    }

    public read16BitsValue = (index: number) => {
        // needs extra 1 byte for second part of 16 byte value that is why there is -2 instead of -1
        if (index < 0 || index > this.memory.length - 2) {
            throw new MemoryOutOfBoundError(index);
        }
        const firstPart = this.memory[index + 1];
        const secondPart = this.memory[index];
        return numberUtils.combineTwo8BitsNumbersInto16BitsNumber(firstPart, secondPart);
    }

    public write16BitsValue = (index: number, value: number) => {
        // needs extra 1 byte for second part of 16 byte value that is why there is -2 instead of -1
        if (index < 0 || index > this.memory.length - 2) {
            throw new MemoryOutOfBoundError(index);
        }
        this.checkEvents(index, value);
        const [ firstPart, secondPart ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
        this.memory[index] = secondPart;
        this.memory[index + 1] = firstPart;
    }

    private checkEvents = (index: number, value: number) => {
        if (index === REGISTERS.MISC.UNMAP_ROM_REGISTER && value !== 0) {
            this.eventBus.emit(new UnmapBiosEvent());
        }
    }
}

export default Memory;