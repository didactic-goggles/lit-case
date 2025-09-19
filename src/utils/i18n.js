import { LocaleManager } from '../lib/locale-manager.js';

const localeManager = new LocaleManager();

export const t = (key, params) => {
  return localeManager.t(key, params);
};

export const updateWhenLocaleChanges = (component) => {
  localeManager.registerComponent(component);

  const originalDisconnectedCallback = component.disconnectedCallback;
  component.disconnectedCallback = function () {
    localeManager.unregisterComponent(this);
    if (originalDisconnectedCallback) {
      originalDisconnectedCallback.call(this);
    }
  };
};

export { localeManager };
