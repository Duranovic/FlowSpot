import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthentificationType } from "../../enums/authentification.enum";
import { AuthentificationPost, User } from "../../models/user.model";

@Injectable()

export class UsersDataService extends DefaultDataService<any>{
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('User', http, httpUrlGenerator);
    }

    override add (authentificationPost: AuthentificationPost): Observable<any>{
        if(authentificationPost.auth_type === AuthentificationType.Login){
            return this.loginFlow(authentificationPost.user);
        }else{
            return this.registerFlow(authentificationPost.user);
        }
    }

    private loginFlow(user: any): any{
        // Model properties and formControls names are different so we need to map it correctly
        const _user: Partial<User> = {
            email: user.email,
            password: user.password,
        };
        
        return this.http.post(`${environment.apiUrl}/users/login`, _user).pipe(
            map((data: any)=>{
                const auth_token = data.auth_token;
                return {..._user, auth_token};
            })
);
    }

    private registerFlow(user: any): any{
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