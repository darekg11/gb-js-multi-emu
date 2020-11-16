import { CLASSIC_GAMEBOY_CLOCK_SPEED } from "../../contants";
import EventBus from "../../event-bus";
import Memory from "../../memory";
import REGISTERS from "../../memory/constants";

class DivTimer {
    private eventBus = new EventBus();
    private memory = new Memory(this.eventBus);
    private ticks = 0;
    private cpuClockSpeed = CLASSIC_GAMEBOY_CLOCK_SPEED;
    private doubleSpeed = false;

    constructor (eventBus: EventBus, memory: Memory, cpuClockSpeed = CLASSIC_GAMEBOY_CLOCK_SPEED, doubleSpeed = false) {
        this.eventBus = eventBus;
        this.memory = memory;
        this.doubleSpeed = doubleSpeed;
        this.cpuClockSpeed = cpuClockSpeed;
    }

    public update (cyclesElapsed: number) {
        this.ticks += cyclesElapsed;
        const threshold = this.calculateThreshold();

        if (this.ticks > threshold) {
            this.ticks -= threshold;
            // DIV is always restarted to 0 so make sure to not overflow it
            // using writeDirect since writing any value to this register reset it back to 0 due to hardware implementation
            this.memory.directWrite8BitsValue(REGISTERS.TIMERS.DIV_REGISTER, (this.memory.read8BitsValue(REGISTERS.TIMERS.DIV_REGISTER) + 1) & 0xFF);
        }
    }

    public reset = () => {
        this.ticks = 0;
        // you can write whatever you wish since writing to DIV_REGISTER anything always reset it back to 0
        this.memory.write8BitsValue(REGISTERS.TIMERS.DIV_REGISTER, 0);
    }

    private calculateThreshold = () => {
        // DIV is always 16KHz
        return (this.cpuClockSpeed / 256) * (this.doubleSpeed ? 2 : 1);
    }
}

export default DivTimer;