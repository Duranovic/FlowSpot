import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EMAIL_PATTERN } from 'src/app/core/constants/patterns.constants';
import { InputType } from 'src/app/core/enums/input-type.enum';
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountComponent implements OnInit {
  public form: FormGroup | undefined;
  public inputType = InputType;
  public createdAccount$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private authentificationFacade: AuthentificationFacade, private ch: ChangeDetectorRef, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateAccountComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      dateOfBirth: new FormControl(new Date(), Validators.required),
    })
  }

  public createAccount() {
    this.authentificationFacade.createAccount(this.form?.getRawValue());
    this.createdAccount$ = this.authentificationFacade.getIsCreatedAccount$;
    // this.usersDataService.register(this.form?.getRawValue()).pipe(
    //   tap(
    //     {
    //       next: (token: string)=>{console.log("TOKEN: ", token)},
    //       error: error => { 
    //         this._snackBar.open(`❌ Couldn't create account! Error: ${extractErrorMessage(error)}`, 'Close',  SNACKBAR_CONFIG);
    //       },
    //       complete: () => { 
    //         this.succesifullyCreatedAccount();
    //     }
    //     },
    //   )
    // ).subscribe();
  }

  public openLoginModal(){
    this.dialog.open(LoginComponent, {width: "100%", maxWidth: "440px", maxHeight: "290px"});
    this.dialogRef.close();
  }

}
