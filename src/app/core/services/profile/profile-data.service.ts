import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "../token-storage.service";

@Injectable()

export class ProfileDataService {
    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

    getProfile(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users/me`, this.tokenStorageService.generateRequestOptions()).pipe(
            map((data: any)=>{
                console.log("DATA: ", data);
                return data.user;
            })
        );
    }

    getSightings(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users/${id}/sightings`).pipe(
            map((data: any)=>{
                return [...data.sightings];
            })
        );
    }
}