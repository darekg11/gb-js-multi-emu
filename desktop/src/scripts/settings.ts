const SCREEN_SCALE_FACTOR_SETTING_KEY_NAME = "GB_JS_MULTI_EMU_SETTINGS_SCREEN_SCALE_FACTOR";
const DEFAULT_SCREEN_SCALE_FACTOR_VALUE = 2;
const MAX_SCREEN_SCALE_FACTOR_VALUE = 5;

class Settings {

    public static getScreenScaleFactor () {
        const value = localStorage.getItem(SCREEN_SCALE_FACTOR_SETTING_KEY_NAME) || DEFAULT_SCREEN_SCALE_FACTOR_VALUE;
        return Number(value);
    }

    public static setScreenScaleFactor (newScreenScaleFactor: number) {
        let safeScaleValue = 1;
        if  (newScreenScaleFactor <= 0) {
            safeScaleValue = 1;
        } else if (newScreenScaleFactor >= MAX_SCREEN_SCALE_FACTOR_VALUE) {
            safeScaleValue = MAX_SCREEN_SCALE_FACTOR_VALUE;
        } else {
            safeScaleValue = newScreenScaleFactor;
        }
        localStorage.setItem(SCREEN_SCALE_FACTOR_SETTING_KEY_NAME, safeScaleValue.toString());
    }

    public static stringify () {
        return JSON.stringify({
            screen_scale_factor: this.getScreenScaleFactor()
        });
    }
}

export { Settings, DEFAULT_SCREEN_SCALE_FACTOR_VALUE, SCREEN_SCALE_FACTOR_SETTING_KEY_NAME }