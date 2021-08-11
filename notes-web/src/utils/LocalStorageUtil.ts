export class LocalStorageUtil {
  static get(key: string) {
    return window.localStorage.getItem(key);
  }

  static set(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }

  static clear() {
    window.localStorage.clear();
  }
}
