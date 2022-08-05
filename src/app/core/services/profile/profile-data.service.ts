// Angular and 3rd party modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Serivces
import { TokenStorageService } from '../token-storage.service';
// Models
import { IUserProfile } from '../../models/user.model';
// Constants
import { environment } from 'src/environments/environment';

@Injectable()
export class ProfileDataService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getProfile(): Observable<IUserProfile> {
    return this.http
      .get(
        `${environment.apiUrl}/users/me`,
        this.tokenStorageService.generateRequestOptions()
      )
      .pipe(
        map((data: any) => {
          return data.user;
        })
      );
  }

  getSightings(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}/sightings`).pipe(
      map((data: any) => {
        return [...data.sightings];
      })
    );
  }
}
