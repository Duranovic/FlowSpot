import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap, Observable, withLatestFrom } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  profileData$: Observable<any[]>;
  userId: number;
  sightings$: Observable<any[]>;

  constructor(
    private tokenStorage: TokenStorageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loaded$ = this.profileService.loaded$.pipe(
      tap((loaded) => {
        loaded
          ? (this.profileData$ = this.profileService.entities$)
          : (this.profileData$ = this.profileService.getAll())
      })
    );
  }

  public logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
