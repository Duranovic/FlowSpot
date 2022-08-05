// Angular and 3rd party modules
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// Services
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { ProfileFacade } from 'src/app/state/profile/profile.facade';
import { FlowersFacade } from 'src/app/state/flowers/flowers.facade';
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public loaded$ = this.profileFacade.loaded$;
  public loading$ = this.profileFacade.loading$;
  public profileData$ = this.profileFacade.getProfile$;

  constructor(
    private tokenStorage: TokenStorageService,
    private profileFacade: ProfileFacade,
    private authentificationFacade: AuthentificationFacade,
    private flowersFacade: FlowersFacade,
    private dialogRef: MatDialogRef<ProfileComponent>
  ) {}

  public ngOnInit(): void {
    this.flowersFacade.getFavoriteFlowers();
  }

  public logout(): void {
    this.authentificationFacade.resetAuthProps();
    this.tokenStorage.signOut();
    this.dialogRef.close();
  }
}
