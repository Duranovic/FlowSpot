import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { tap, Observable, map, first } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CreateAccountComponent } from 'src/app/features/create-account/create-account.component';
import { LoginComponent } from 'src/app/features/login/login.component';
import { ProfileComponent } from 'src/app/features/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean; 
  public isUserLoaded$: Observable<boolean>;
  public userDetails$: Observable<any>;

  constructor(public dialog: MatDialog, private tokenStorageService: TokenStorageService, private profileService: ProfileService) { }

  public ngOnInit(): void {
    this.isLoggedIn = (this.tokenStorageService.getToken() != null) ? true : false;
    this.isUserLoaded$ = this.profileService.loaded$.pipe(
      tap((loaded) => {
         (loaded
          ? (this.userDetails$ = this.profileService.entities$)
          : (this.userDetails$ = this.profileService.getAll()));
      })
    );
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
}
