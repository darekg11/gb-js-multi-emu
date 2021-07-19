import {LIGHT_THEME_COLORS, DARK_THEME_COLORS} from '../styles';

let PALLETE_TO_USE = LIGHT_THEME_COLORS;

const setup = (isDarkMode: boolean) => {
  PALLETE_TO_USE = isDarkMode ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
};

const getBackgroundColor = () => {
  return PALLETE_TO_USE.BACKGROUND_PRIMARY_COLOR;
};

const getPrimaryColor = () => {
  return PALLETE_TO_USE.PRIMARY_COLOR;
};

const getSecondaryColor = () => {
  return PALLETE_TO_USE.SECONDARY_COLOR;
};

const getTextPrimaryColor = () => {
  return PALLETE_TO_USE.TEXT_PRIMARY;
};

const getTextSecondaryColor = () => {
  return PALLETE_TO_USE.TEXT_SECONDARY;
};

const getErrorColor = () => {
  return PALLETE_TO_USE.ERROR;
};

const getDividerColor = () => {
  return PALLETE_TO_USE.DIVIDER_COLOR;
};

export {
  setup,
  getBackgroundColor,
  getPrimaryColor,
  getSecondaryColor,
  getTextPrimaryColor,
  getTextSecondaryColor,
  getErrorColor,
  getDividerColor,
};
