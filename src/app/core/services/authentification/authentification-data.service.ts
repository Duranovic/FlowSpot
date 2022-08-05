// Angular and 3rd party modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// Models
import { IUser, User } from '../../models/user.model';
// Constants
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthentificationDataService {
  constructor(private http: HttpClient) {}

  public login(user: Partial<IUser>): Observable<string> {
    const _user: Partial<IUser> = {
      email: user.email,
      password: user.password,
    };

    return this.http.post(`${environment.apiUrl}/users/login`, _user).pipe(
      map((data: any) => {
        return data.auth_token;
      })
    );
  }

  public createAccount(user: any): Observable<any> {
    const _user: User = new User(
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.dateOfBirth
    );

    return this.http.post(`${environment.apiUrl}/users/register`, _user).pipe(
      map((data: any) => {
        const auth_token = data.auth_token;
        return { ..._user, auth_token };
      })
    );
  }
}
