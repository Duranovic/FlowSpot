import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { EMAIL_PATTERN } from 'src/app/core/constants/patterns.constants';
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import { AuthentificationType } from 'src/app/core/enums/authentification.enum';
import { InputType } from 'src/app/core/enums/input-type.enum';
import { AuthentificationPost } from 'src/app/core/models/user.model';
import { UsersDataService } from 'src/app/core/services/users/users-data.service';
import { extractErrorMessage } from 'src/app/core/utils/account.utils';
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
  public successifullyCreatedAccountFlag: boolean;

  constructor(private formBuilder: FormBuilder, private usersDataService: UsersDataService, private ch: ChangeDetectorRef, public dialog: MatDialog ,public dialogRef: MatDialogRef<CreateAccountComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      dateOfBirth: new FormControl(new Date(), Validators.required),
    })
  }

  public createAccount(){
    const data = {
      auth_type: AuthentificationType.Register,
      user: this.form?.getRawValue()
    } as AuthentificationPost;
    
    this.usersDataService.add(data).pipe(
      tap(
        {
          next: (token: string)=>{console.log("TOKEN: ", token)},
          error: error => { 
            this._snackBar.open(`❌ Couldn't create account! Error: ${extractErrorMessage(error)}`, 'Close',  SNACKBAR_CONFIG);
          },
          complete: () => { 
            this.succesifullyCreatedAccount();
        }
        },
      )
    ).subscribe();
  }

  private succesifullyCreatedAccount(){
    this.successifullyCreatedAccountFlag = true;
    this.ch.detectChanges();
  }

  public openLoginModal(){
    this.dialog.open(LoginComponent, {width: "100%", maxWidth: "440px", maxHeight: "290px"});
    this.dialogRef.close();
  }

}
