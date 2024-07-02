import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY:string = '_auth-token';

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY) ?? "";
  }

  public hasToken(): boolean {
    // @ts-ignore
    return sessionStorage.getItem(this.TOKEN_KEY) !== null && sessionStorage.getItem(this.TOKEN_KEY) !== undefined && sessionStorage.getItem(this.TOKEN_KEY) !== "" && sessionStorage.getItem(this.TOKEN_KEY).length > 0;
  }
}
