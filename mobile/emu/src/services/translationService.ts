import i18n, {TranslateOptions} from 'i18n-js';
import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import en_translations from '../../locales/en';
import pl_translations from '../../locales/pl';
import {APP_TRANSLATIONS} from '../../locales';

const translationsMap = new Map<string, object>();
translationsMap.set('en', en_translations);
translationsMap.set('pl', pl_translations);

const translate = memoize(
  (key: APP_TRANSLATIONS, config: TranslateOptions = {}): string =>
    i18n.t(key, config),
  (key: APP_TRANSLATIONS, config: TranslateOptions = {}): string =>
    config ? key + JSON.stringify(config) : key,
);

const setup = (): void => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Array.from(translationsMap.keys())) ||
    fallback;

  // clear translation cache
  if (translate && translate.cache && translate.cache.clear) {
    translate.cache.clear();
  }
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  const translationKey: string = languageTag;
  i18n.translations = {
    [languageTag]: translationsMap.get(translationKey) || {},
  };
  i18n.locale = languageTag;
};

const getCurrentLocale = () => i18n.currentLocale();

export {getCurrentLocale, translate, setup};
