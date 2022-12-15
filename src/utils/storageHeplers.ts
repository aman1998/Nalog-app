export enum EStorageKeys {
  TOKEN = "token",
  TIMER = "timer",
  GREETING = "greeting",
  THEME = "theme",
  I18NEXT_LNG = "i18nextLng"
}

export function setStorage(key: EStorageKeys | string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorageData<T>(key: EStorageKeys | string): undefined | T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
}

export function removeStorageItem(key: EStorageKeys | string): void {
  localStorage.removeItem(key);
}

export function setSessionStorage(key: EStorageKeys | string, data: unknown): void {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getSessionStorageData<T>(key: EStorageKeys | string): undefined | T {
  try {
    const item = sessionStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
}

export function removeSessionStorageItem(key: EStorageKeys | string): void {
  sessionStorage.removeItem(key);
}
