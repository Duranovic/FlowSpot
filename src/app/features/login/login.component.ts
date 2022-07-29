import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType } from 'src/app/core/enums/input-type.enum';
import { tap } from 'rxjs';
import { UsersDataService } from 'src/app/core/services/users/users-data.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { SNACKBAR_CONFIG } from 'src/app/core/constants/snackbar-config.constants';
import { extractErrorMessage } from 'src/app/core/utils/account.utils';
import { EMAIL_PATTERN } from 'src/app/core/constants/patterns.constants';
import { AuthentificationPost } from 'src/app/core/models/user.model';
import { AuthentificationType } from 'src/app/core/enums/authentification.enum';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public inputType = InputType;
  public sucssesifullyLoggedIn: boolean;
  
  constructor(private formBuilder: FormBuilder, private usersService: UsersDataService, private _snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  public login(){
    const data = {
      auth_type: AuthentificationType.Login,
      user: this.form?.getRawValue()
    } as AuthentificationPost;

    this.usersService.add(data).pipe(
      tap(
        {
          next: (response: any)=>{
            this._snackBar.open(`✅  You are logged succesifully!`, 'Close', SNACKBAR_CONFIG);
            this.sucssesifullyLoggedIn = true;
            this.tokenStorage.saveToken(response.auth_token);
            this.sucssesifullyLoggedIn = true;            
            setTimeout(()=>{
              window.location.reload();
            }, 1500)
          },
          error: error => { 
            this._snackBar.open(`❌ Couldn't log in! Error: ${extractErrorMessage(error)}`, 'Close',  SNACKBAR_CONFIG);
          },
        },
      )
    ).subscribe();
  }

  private buildForm(){
    return this.formBuilder.group({
      'email': new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
}
