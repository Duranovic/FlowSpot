import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from 'src/app/features/create-account/create-account.component';
import { LoginComponent } from 'src/app/features/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public openCreateAccountDialog(): void {
    this.dialog.open(CreateAccountComponent, {width: "100%", maxWidth: "440px", maxHeight: "410px"});
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {width: "100%", maxWidth: "440px", maxHeight: "290px"});
  }
}
