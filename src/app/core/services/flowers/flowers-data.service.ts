import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Flower } from "../../models/flower.model";

@Injectable()

export class FlowersDataService extends DefaultDataService<Flower>{
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Flower', http, httpUrlGenerator);
    }

    override getAll(): Observable<Flower[]>{
        return this.http.get(`${environment.apiUrl}/flowers`).pipe(
            map((data: any)=>{
                return data.flowers;
            })
        );
    }
}