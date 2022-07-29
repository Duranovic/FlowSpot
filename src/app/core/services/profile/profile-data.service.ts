import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "../token-storage.service";

@Injectable()

export class ProfileDataService extends DefaultDataService<any>{
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private tokenStorageService: TokenStorageService) {
        super('User', http, httpUrlGenerator);
    }

    override getAll(): Observable<any[]> {
        const header = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.tokenStorageService.getToken()}`,
            }
        );
         
        return this.http.get(`${environment.apiUrl}/users/me`, {headers: header}).pipe(
            map((data: any)=>{
                return [{...data.user}];
            })
        );
    }

    override getById(id: number | string): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users/${id}/sightings`).pipe(
            map((data: any)=>{
                return {...data.user};
            })
        );
    }
}