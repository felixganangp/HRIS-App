import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const BROWSER_STORAGE = new InjectionToken<Storage | null>('BROWSER_STORAGE', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId) ? window.localStorage : null;
  },
});

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {
  private readonly storage = inject(BROWSER_STORAGE);

  getItem(key: string): string | null {
    try {
      return this.storage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      this.storage?.setItem(key, value);
    } catch {}
  }

  removeItem(key: string): void {
    try {
      this.storage?.removeItem(key);
    } catch {}
  }
}

export function provideBrowserStorage(): EnvironmentProviders {
  return makeEnvironmentProviders([BrowserStorageService]);
}
