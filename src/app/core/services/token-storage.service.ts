import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public generateRequestOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
  }
}
