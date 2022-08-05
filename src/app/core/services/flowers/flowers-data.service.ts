// Angular and 3rd party modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { TokenStorageService } from '../token-storage.service';
// Constants
import { environment } from 'src/environments/environment';

@Injectable()
export class FlowersDataService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  public getFlowers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/flowers`);
  }

  public getFavoriteFlowers(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/flowers/favorites`,
      this.tokenStorageService.generateRequestOptions()
    );
  }

  public setFavoriteFlower(flowerId: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/flowers/${flowerId}/favorites`,
      flowerId,
      this.tokenStorageService.generateRequestOptions()
    );
  }

  public deleteFavoriteFlower(
    flowerId: number,
    fav_flower_id: number
  ): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/flowers/${flowerId}/favorites/${fav_flower_id}`,
      this.tokenStorageService.generateRequestOptions()
    );
  }
}
