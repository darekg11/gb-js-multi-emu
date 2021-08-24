import { numberUtils } from "../../../utils/index";
import { CLASSIC_GAMEBOY_CLOCK_SPEED } from "../../contants";
import EventBus from "../../event-bus";
import { RequestTimaInterruptEvent } from "../../event-bus/events/REQUEST_TIMA_INTERRUPT";
import Memory from "../../memory";
import REGISTERS from "../../memory/constants";

class TimaTimer {
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
        const TAC_REGISTER_VALUE = this.memory.read8BitsValue(REGISTERS.TIMERS.TAC_REGISTER);
        const isTIMAEnabled = numberUtils.isBitSet(TAC_REGISTER_VALUE, 2);
        if (!isTIMAEnabled) {
            return;
        }

        this.ticks += cyclesElapsed;
        const threshold = this.calculateThreshold();

        while (this.ticks >= threshold) {
            this.ticks -= threshold;
            const newTimerValue = this.memory.read8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER) + 1;

            // Overflowing so generate interrupt request
            if (newTimerValue > 0xFF) {
                // Write TMA Register back to TIMA
                this.memory.write8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER, this.memory.read8BitsValue(REGISTERS.TIMERS.TMA_REGISTER));
                // Request interrupt via EventBus
                this.eventBus.emit(new RequestTimaInterruptEvent());
            } else {
                this.memory.write8BitsValue(REGISTERS.TIMERS.TIMA_REGISTER, newTimerValue);
            }
        }
    }

    private calculateThreshold = () => {
        const TAC_REGISTER_VALUE = this.memory.read8BitsValue(REGISTERS.TIMERS.TAC_REGISTER);
        const frequency = TAC_REGISTER_VALUE & 3;
        if (frequency === 0) {
            return Math.floor((this.cpuClockSpeed / 4096) * (this.doubleSpeed ? 2 : 1));
        }
        if (frequency === 1) {
            return Math.floor((this.cpuClockSpeed / 262144) * (this.doubleSpeed ? 2 : 1));
        }
        if (frequency === 2) {
            return Math.floor((this.cpuClockSpeed / 65536) * (this.doubleSpeed ? 2 : 1));
        }
        if (frequency === 3) {
            return Math.floor((this.cpuClockSpeed / 16382) * (this.doubleSpeed ? 2 : 1));
        }
        return Math.floor((this.cpuClockSpeed / 4096) * ( this.doubleSpeed ? 2 : 1));
    }

    public reset = () => {
        this.ticks = 0;
    }
}

export default TimaTimer;