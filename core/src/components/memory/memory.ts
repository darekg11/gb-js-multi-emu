import { numberUtils } from "../../utils/index";
import MemoryOutOfBoundError from "../../errors/MemoryOutOfBoundError";
import EventBus from "../event-bus";
import REGISTERS from "./constants";
import { UnmapBiosEvent } from "../event-bus/events/UNMAP_BIOS";
import { CARTRIDGE_TYPE_INDEX } from "../cartridge/constants";
import { CARTRIGDE_TYPES } from "../cartridge/types";

const MEMORY_SIZE = 65536;

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
        if (index === REGISTERS.MISC.UNMAP_ROM_REGISTER && value !== 0) {
            this.memory[REGISTERS.MISC.UNMAP_ROM_REGISTER] = value;
            this.eventBus.emit(new UnmapBiosEvent());
            return;
        }
        // if (index === REGISTERS.TIMERS.TAC_REGISTER) {
        //     this.memory[REGISTERS.TIMERS.TAC_REGISTER] &= 0b00000111;
        //     return;
        // }
        if (index === REGISTERS.TIMERS.DIV_REGISTER) {
            this.memory[REGISTERS.TIMERS.DIV_REGISTER] = 0;
            return;
        }
        if (index === REGISTERS.GPU.LY_REGISTER) {
            this.memory[REGISTERS.GPU.LY_REGISTER] = 0;
            return;
        }
        if (index === REGISTERS.MEMORY.DMA_TRANSFER_START_REGISTER) {
            this.DMA(value);
            return;
        }
        if (index === REGISTERS.JOYPAD.STATE) {
            // Bits 0 - 3 are read only
            // Bits 4 - 5 are write / read
            // Bits 6 - 7 are not used
            this.memory[REGISTERS.JOYPAD.STATE] = ((this.memory[REGISTERS.JOYPAD.STATE] & 0b00001111) | (value & 0b00110000));
            return;
        }
        // if MBC === 0 do not allow writes under 0x8000 - for example Dr Mario is doing illegal writes messing up logic on it's own
        const romType = this.memory[CARTRIDGE_TYPE_INDEX];
        if (romType === CARTRIGDE_TYPES.ROM_ONLY && index < 0x8000) {
            return;
        }
        this.memory[index] = value;
    }

    public directWrite8BitsValue = (index: number, value: number) => {
        if (index < 0 || index > this.memory.length - 1) {
            throw new MemoryOutOfBoundError(index);
        }
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
        
        // if MBC === 0 do not allow writes under 0x8000 - for example Dr Mario is doing illegal writes messing up logic on it's own
        const romType = this.memory[CARTRIDGE_TYPE_INDEX];
        if (romType === CARTRIGDE_TYPES.ROM_ONLY && index < 0x8000) {
            return;
        }

        const [ firstPart, secondPart ] = numberUtils.split16BitsNumberIntoTwo8BitsNumbers(value);
        this.memory[index] = secondPart;
        this.memory[index + 1] = firstPart;
    }

    private DMA = (index: number) => {
        // source is index * 100
        const source = index << 8;
        for (let writeOffset = 0; writeOffset < 0xA0; writeOffset++) {
            this.memory[REGISTERS.MEMORY.OAM_AREA_START_INDEX + writeOffset] = this.memory[source + writeOffset];
        }
    }

    public reset = () => {
        this.memory = new Uint8Array(MEMORY_SIZE);
    }
}

export default Memory;