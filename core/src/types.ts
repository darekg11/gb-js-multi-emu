interface IEmulatorSettings {
    load_bios: boolean
}

class DefaultEmulatorSettings implements IEmulatorSettings {
    load_bios = true;
};

export { IEmulatorSettings, DefaultEmulatorSettings };