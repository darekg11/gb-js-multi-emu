import { numberUtils } from "../../utils";
import {
    SPRITE_ATTRIBUTES_BITS
} from "../gpu/constants";
import REGISTERS from "../memory/constants";

class OAM {
    private x: number = 0;
    private y: number = 0;
    private index: number = 0;
    private xFlip: boolean = false;
    private yFlip: boolean = false;
    private palleteRegister: number = 0;
    private priority: boolean = false;

    constructor(x: number, y: number, index: number, attributes: number) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.xFlip = numberUtils.isBitSet(attributes, SPRITE_ATTRIBUTES_BITS.X_FLIP);
        this.yFlip = numberUtils.isBitSet(attributes, SPRITE_ATTRIBUTES_BITS.Y_FLIP);
        this.palleteRegister = numberUtils.isBitSet(attributes, SPRITE_ATTRIBUTES_BITS.PALLETE_NUMBER) ? REGISTERS.GPU.OBJECT_PALLETE_ONE_REGISTER : REGISTERS.GPU.OBJECT_PALLETE_ZERO_REGISTER;
        this.priority = numberUtils.isBitSet(attributes, SPRITE_ATTRIBUTES_BITS.PRIORITY);
    }

    public getX = () => {
        return this.x;
    }

    public getY = () => {
        return this.y;
    }

    public getIndex = () => {
        return this.index;
    }

    public isXFlipped = () => {
        return this.xFlip;
    }

    public isYFlipped = () => {
        return this.yFlip;
    }

    public getPalleteRegister = () => {
        return this.palleteRegister;
    }

    public isPriority = () => {
        return this.priority;
    }
}

export default OAM;