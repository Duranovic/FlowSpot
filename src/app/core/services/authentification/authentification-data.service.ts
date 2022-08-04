import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../models/user.model";

@Injectable()

export class AuthentificationDataService {
    constructor(private http: HttpClient) { }

    public login(user: any): Observable<any>{
        // Model properties and formControls names are different so we need to map it correctly
        const _user: Partial<User> = {
            email: user.email,
            password: user.password,
        };
        
        return this.http.post(`${environment.apiUrl}/users/login`, _user).pipe(
            map((data: any)=>{                
                return data.auth_token;
            })
);
    }

    public createAccount(user: any): Observable<any>{
        const _user: User = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            date_of_birth: user.dateOfBirth
        };

        return this.http.post(`${environment.apiUrl}/users/register`, _user).pipe(
            map((data: any)=>{
                const auth_token = data.auth_token;
                return {..._user, auth_token};
            })
        );
    }
}