import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap, Observable, withLatestFrom, switchMap, combineLatest, of } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ProfileDataService } from 'src/app/core/services/profile/profile-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Store } from '@ngrx/store';
import { getFavoriteFlowersStart, getFlowersStart } from 'src/app/state/flowers/flower.action';
import { AppState } from 'src/app/state/app.state';
import { getFlowers } from 'src/app/state/flowers/flower.selectors';
import { getProfileStart } from 'src/app/state/profile/profile.actions';
import { ProfileFacade } from 'src/app/state/profile/profile.facade';
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  loaded$ = this.profileFacade.loaded$;
  loading$ = this.profileFacade.loading$;
  profileData$ = this.profileFacade.getProfile$;

  constructor(
    private tokenStorage: TokenStorageService,
    private profileFacade: ProfileFacade,
    private authentificationFacade: AuthentificationFacade,
    private flowersFacade: FlowersFacade,
    private dialogRef: MatDialogRef<ProfileComponent>
  ) {}

  ngOnInit(): void {
    this.flowersFacade.getFavoriteFlowers();
  }

  public logout() {
    this.authentificationFacade.resetAuthProps();
    this.tokenStorage.signOut();
    this.dialogRef.close();
  }
}
