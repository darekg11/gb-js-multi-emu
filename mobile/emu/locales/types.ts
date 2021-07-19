import {DRAWER} from '../src/views/components/drawer/locales';

enum ERRORS {
  'default_fallback' = 'errors.default_fallback',
}

// This creates a merged enum, but not a type
const APP_TRANSLATIONS = {
  DRAWER,
  ERRORS,
};

type APP_TRANSLATIONS = DRAWER | ERRORS;

export {APP_TRANSLATIONS};
