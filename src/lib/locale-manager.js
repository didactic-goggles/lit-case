import tr from '../locales/tr.js';
import en from '../locales/en.js';

const STRING_SEPARATOR = '.';

export class LocaleManager {
  constructor() {
    this.components = new Set();
    this.currentLocale = document.documentElement.lang || 'tr';
  }

  registerComponent(component) {
    this.components.add(component);
  }

  unregisterComponent(component) {
    this.components.delete(component);
  }

  setLocale(locale) {
    this.currentLocale = locale;
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);

    this.components.forEach((component) => {
      if (component.isConnected) {
        component.requestUpdate();
      }
    });
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  getLocaleSource(locale) {
    if (locale === 'tr') {
      return tr;
    }
    return en;
  }

  getNestedValue(obj, path) {
    return path
      .split(STRING_SEPARATOR)
      .reduce(
        (current, key) =>
          current && current[key] !== undefined ? current[key] : null,
        obj
      );
  }

  replaceParams(text, params) {
    if (!params || typeof text !== 'string') {
      return text;
    }

    return Object.keys(params).reduce((result, key) => {
      const placeholder = `{${key}}`;
      return result.replace(new RegExp(placeholder, 'g'), params[key]);
    }, text);
  }

  getLocaleKeyToValue(key, params) {
    const locale = this.getLocaleSource(this.getCurrentLocale());
    const value = this.getNestedValue(locale, key) || key;

    if (params) {
      return this.replaceParams(value, params);
    }

    return value;
  }

  t(key, params) {
    return this.getLocaleKeyToValue(key, params);
  }

  init() {
    const locale = localStorage.getItem('locale') || 'tr';
    this.setLocale(locale);
  }
}
