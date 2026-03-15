import { inject, Injectable } from '@angular/core';
import { ApiConfiguration } from '../generated/';

const SESSION_KEY_TOKEN = 'garage_token';
const SESSION_KEY_URL = 'garage_url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiConfiguration = inject(ApiConfiguration);

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
    const url = sessionStorage.getItem(SESSION_KEY_URL);
    if (token && url) {
      this.applyConfiguration(url);
    }
  }

  private applyConfiguration(url: string): void {
    this.apiConfiguration.rootUrl = url;
  }

  getToken(): string | null {
    return sessionStorage.getItem(SESSION_KEY_TOKEN);
  }

  getUrl(): string | null {
    return sessionStorage.getItem(SESSION_KEY_URL);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUrl();
  }

  login(url: string, token: string): void {
    sessionStorage.setItem(SESSION_KEY_TOKEN, token);
    sessionStorage.setItem(SESSION_KEY_URL, url);
    this.applyConfiguration(url);
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY_TOKEN);
    sessionStorage.removeItem(SESSION_KEY_URL);
    this.apiConfiguration.rootUrl = '';
  }
}
