interface IEmulatorSettings {
    load_bios: boolean
}

class DefaultEmulatorSettings implements IEmulatorSettings {
    load_bios = true;
};

type IOnDrawFrameCallback = (pixelBuffer: Uint8ClampedArray) => void

export { IEmulatorSettings, DefaultEmulatorSettings, IOnDrawFrameCallback };