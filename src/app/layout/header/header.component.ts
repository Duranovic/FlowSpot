import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { tap, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CreateAccountComponent } from 'src/app/features/create-account/create-account.component';
import { LoginComponent } from 'src/app/features/login/login.component';
import { ProfileComponent } from 'src/app/features/profile/profile.component';
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';
import { ProfileFacade } from 'src/app/state/profile/profile.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loggedIn$: Observable<boolean>;
  public isUserLoaded$: Observable<boolean> = this.profileFacade.loaded$;
  public userDetails$: Observable<any> = this.profileFacade.getProfile$;
  public mobileNavOpened: boolean;

  constructor(public dialog: MatDialog, private authentificationFacade: AuthentificationFacade, private ch: ChangeDetectorRef,private tokenStorageService: TokenStorageService, private profileFacade: ProfileFacade) { }

  public ngOnInit(): void {
    this.loggedIn$ = this.authentificationFacade.getIsUserLoggedIn$.pipe(
      tap((isLoggedIn)=>{
        if(isLoggedIn) 
        this.profileFacade.getProfile()
        this.ch.detectChanges();
      })
    )
  }

  public openCreateAccountDialog(): void {
    this.dialog.open(CreateAccountComponent, {width: "100%", maxWidth: "440px", maxHeight: "410px"});
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {width: "100%", maxWidth: "440px", maxHeight: "290px"});
  }

  public openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {width: "100%", height: "100%", maxWidth: "590px", maxHeight: "610px"});
  }

  public openMobileNav(): void{
    this.mobileNavOpened = !this.mobileNavOpened;
  }
}
