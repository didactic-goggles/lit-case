export class StorageManager {
  static getItem(key, defaultValue) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return defaultValue;
  }

  static setItem(key, value) {
    localStorage.setItem(key, value);
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}