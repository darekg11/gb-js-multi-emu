import CPU from "./components/cpu";
import Memory from "./components/memory";
import Cartridge from "./components/cartridge";
import EventBus from "./components/event-bus";
import { EVENT_TYPES } from "./components/event-bus/types";

const DMG_BIOS = [
    0x31, // LD SP, nn - initializing STACK -> LD SP, 0xFFFE
    0xFE, // n
    0xFF, // n + 1
    0xAF, // XOR A A - setting A Register to 0
    0x21, // LD HL, nn - LD HL, 0x9FFF
    0xFF, // LD
    0x9F, // LD
    0x32, // LD (HL -), A -> Load to [HL] a value of reg A which is 0 and decrease HL
    0xCB, // CB SWITCH
    0x7C, // BIT 7H, sets zero flag is true
    0x20, // JR NZ, n
    0xFB, // address to jump -> this affectively should jump back to 0x0007 aka  LD (HL -) A looping it back up until all of VRAM (0x8000 - 0x9FFF) is cleared
    0x21, // LD HL, nn -> LD HL, 0xFF26 FF26 is register responsible for Sound ON / OFF -- AUDIO DEVICE INIT START (turns on device and write some basic info)
    0x26,
    0xFF,
    0x0E, // LOAD TO REG C, NEXT MEMORY CELL LD C, 0x11
    0x11, 
    0x3E, // LOAD TO REG A, NEXT MEMORY CELL LD A, 0x80
    0x80,
    0x32, // LD (HL -), A and decrement HL -> LOAD 0xFF26, 0x80 - enabling sound everywhere
    0xE2, // LD (C), A but it's load HIGH so 0xFF00 + C = 0xFF11 -> LD 0xFF11 0x80, LOAD x80 to Sound Mode 1 register, sound length, wave pattern
    0x0C, // INC C -> 0x12
    0x3E, // LOAD A, n so LOAD A, 0xF3
    0xF3, 
    0xE2, // LD (C), A but it's load HIGH so 0xFF00 + C = 0xFF12 -> LD 0xFF12 0xF3, LOAD 0xF3 to Sound Mode 1 register, Envelope
    0x32, // LD (HL -), A and decrement HL -> LOAD 0xFF25, 0xF3 - Selection of Sound output terminal (R/W)
    0x3E, // LOAD A, n so LOAD A, 0x77
    0x77,
    0x77, // LD (HL), A LD 0xFF24 0x77 Channel control / ON-OFF / Volume (R/W) -- AUDIO DEVICE INIT END
    0x3E, // LD A, 0xFC -- STARTS VIDEO RAM INITIALIZATION AND PALLETE
    0xFC,
    0xE0, // LD HIGH (n) A LD 0xFF47 0xFC
    0x47, // 0xFF47 is background color pallete // write only 
          // 0xFC === "11 11 11 00" -> color 0 === white, color 1 === black, color 2 === black, color 3 === black
          // Bits 0-1 defines color 0
          // Bits 2-3 defines color 1
          // Bits 4-5 defines color 2
          // Bits 6-7 defines color 3
          // Colours:
          // 0 -> white
          // 1 -> light grey
          // 2 -> dark fray
          // 3 -> black
    
    0x11, // LOAD TO REG DE NEXT TWO MEMORY CELLS LD DE, 0x0104 | 0x104 is destination in ROM where Nintendo log starts
    0x04, // hence this will copy Nintendo logo to VRAM at 0x8010 after decompression and scaling
    0x01, 
    0x21, // LOAD TO REG HL A NEXT TWO MEMORY CELLS LD HL, 0x8010
    0x10,
    0x80, 
    0x1A, // LD A, (DL) LD A [0x104]
    0xCD, // CALL 0x95
    0x95,
    0x00, // NOP
    0xCD, // CALL 0x96
    0x96, 
    0x00, // NOP
    0x13, // INC DE
    0x7B, // LD A, E
    0xFE, // CP 0x34
    0x34,
    0x20, // JR NZ 0xF3 -- FINISH OF DECOMPRESSING, SCALING AND STORING NINTENDO LOGO IN VRAM,
          // LOOP IF NOT FINISHED DECOMPRESSING
    0xF3,

    0x11, // LD DE 0x00D8 -> Load 8 additional bytes into Video RAM (the tile for ®)
    0xD8, 
    0x00,
    0x06, // LD B, 0x08
    0x08,
    
    0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
    0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
    0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
    0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
    0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
    0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xE2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
    0x4F, 0x16, 0x20, 0x18, 0xCB, 
    
    0x4F, // LD C, A  // THIS IS 0x95 AN ADDRESS OF CALL FROM LINE 57 HERE CALL 0x95
          // REG A SHOULD HAVE VALUE FROM 0x104 WHICH IS FIRST NINTENO TILE
          // THIS IS DECOMPRESSION AND SCALING ROUTINE OF NINTENDO LOGO
    0x06, // LD B 0x04
    0x04,
    0xC5, // PUSH BC - 0x400 === 1024
    0xCB, // CB PREFIX
    0x11, // RLC
    0x17, // RLA
    0xC1, // POP BC
    0xCB, // CB PREFIX
    0x11, // RLC
    0x17, // RLA
    0x05, // DEC B
    0x20, // JR NZ N, JR NZ 0xF5 FINAL JUMP WOULD BE TO ADDRESS = 0xA1 (PC) + 2 + (-11) = 0x98
    0xF5,
    0x22, // LD (HL+), A -> STORE IN VRAM A DECOMPRESS LOGO BYTE
    0x23, // INCREASE HL
    0x22, // LD (HL+), A -> STORE THE SAME LOGO BYTE IN VRAM AGAIN TO MAKE IT BIGGER VERTICALLY
    0x23, // INCREASE HL
    0xC9, // RETURN

    // NINTENDO LOGO START
    0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
    0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D,
    0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
    0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99,
    0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
    0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E,
    0x3C, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x3C, // THIS IS (r) FROM NINTENDO LOGO
    // NINTENDO LOGO END

    // NINTENDO LOGO COMPARISION ROUTINE
    0x21, // LD HL, 0x104 -> LOGO BEGIN
    0x04,
    0x01,
    0x11, // LD DE, nn -> LD DE, 0xA8 which is LOGO in BIOS 
    0xA8,
    0x00,
    0x1A, // LD A, (DE) LOAD TO REG A, A VALUE FROM MEMORY[0xA8]
    0x13, // INC DE -> next byte
    0xBE, // CP A, [HL] which is logo byte from BIOS and ROM
    0x20, // JR NZ -> JMP TO 0x00E9 and therefore lockup Gameboy
    0xFE,
    0x23, // INC HL
    0x7D, // LD A, L
    0xFE, // CP A, 0x34 -> loop condition
    0x34,
    0x20, // JR NZ 0xF5, jump back to 0x00E6 looping to from 0x1A <LD A, (DE)>
    0xF5,
    0x06, // LD B, n LD B, 0x19 - coutner, preparing for checksum
    0x19,
    0x78, // LD A, B -> LD A, 0x19
    0x86, // ADD A, [HL]
    0x23, // INC HL
    0x05, // DEC B
    0x20, // LOOP TO 0xEC, lock if 0x19 + bytes from $0134-$014D  don't add to $00
    0xFB,
    0x86, // ADD A, [HL] -> add last byte; the ‘header checksum’
    0x20, // IF BAD CHECKSUMLOOP TO 0xEF 0x20 0xF5 locking it
    0xFE,
    // END NINTENDO LOGO COMPARISION ROUTINE

    // UNMAP BIOS
    0x3E, // LD A, 0x01
    0x01,
    0xE0, // LDH 0x50 1 = LD 0xFF50, 1. Writing non zero value to register 0xFF50 unmaps BIOS from memory and making it all for actual ROM
    0x50,
];

class GameboyEmulator {
    // CPU instance
    private cpu = new CPU();

    // Event Bus instance
    private eventBus = new EventBus();

    // Memory instance
    private memory = new Memory(this.eventBus);

    // Cartridge instance
    private cartridge = new Cartridge();

    // Ticks passed
    private ticks: number = 0;

    private biosSize: number = 0;

    constructor() {
        DMG_BIOS.forEach((value, index) => {
            this.memory.write8BitsValue(index, value);
        });
        this.biosSize = DMG_BIOS.length;
        this.initializeEventBus();
    }

    private initializeEventBus = () => {
        this.eventBus.addHandler({
            type: EVENT_TYPES.UNAMP_BIOS,
            callback: this.unmapBios
        })
    }

    private unmapBios = () => {
        this.cartridge.getProgramData().forEach((value, index) => {
            this.memory.write8BitsValue(index, value);
        });
    }

    public loadCartridge = (cartridge: Cartridge) => {
        this.cartridge = cartridge;
        // do not copy first 0x100 bytes since at the beggining it's BIOS
        // which get unammped at the end of BOOT sequence
        this.cartridge.getProgramData().slice(0x100).forEach((value, index) => {
            this.memory.write8BitsValue(index + this.biosSize, value);
        });
        this.cpu = new CPU();
    }

    public run = () => {
        this.tick();
    }

    public getCPUDebugInfo = () => ({
        PC: this.cpu.getProgramCounter(),
        A: this.cpu.getRegisterAValue(),
        B: this.cpu.getRegisterBValue(),
        C: this.cpu.getRegisterCValue(),
        D: this.cpu.getRegisterDValue(),
        E: this.cpu.getRegisterEValue(),
        F: this.cpu.getRegisterFValue(),
        H: this.cpu.getRegisterHValue(),
        L: this.cpu.getRegisterLValue(),
        HL: this.cpu.getRegisterHLValue(),
        DE: this.cpu.getRegisterDEValue(),
        BC: this.cpu.getRegisterBCValue(),
        SP: this.cpu.getRegisterSPValue(),
        ZERO_FLAG: this.cpu.isZeroFlagSet(),
        SUBTRACTION_FLAG: this.cpu.isSubtractionFlagSet(),
        HALF_CARRY_FLAG: this.cpu.isHalfCarryFlagSet(),
        CARRY_FLAG: this.cpu.isCarryFlagSet()
    })

    public getROMDebugInfo = () => ({
        NAME: this.cartridge.getProgramName(),
        MANUFACTURER: this.cartridge.getProgramManufacturerCode(),
        IS_COLOR: this.cartridge.isCGB(),
        IS_SUPER: this.cartridge.isSGB(),
        TYPE: this.cartridge.getCartridgeType()
    })

    public getMemoryValue = (address: number) => {
        return this.memory.read8BitsValue(address);
    }

    private tick = () => {
        const tickCount = this.cpu.tick(this.memory);
        this.ticks += tickCount;
    }
}

export default GameboyEmulator;