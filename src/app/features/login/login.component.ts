// Angular and 3rd party
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';

// Services
import { AuthentificationFacade } from 'src/app/state/authentification/authentification.facade';

// Components
import { ProfileComponent } from '../profile/profile.component';

// Constants and enums
import { EMAIL_PATTERN } from 'src/app/core/constants/patterns.constants';
import { InputType } from 'src/app/core/enums/input-type.enum';

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
  public loggedIn$: Observable<boolean>;
  
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private dialogRef: MatDialogRef<LoginComponent>, private authentificationFacade: AuthentificationFacade, private ch: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.form = this.buildForm();
  }

  public login(): void{
    this.authentificationFacade.login(this.form?.getRawValue());
    this.loggedIn$ = this.authentificationFacade.getIsUserLoggedIn$.pipe(
      tap(()=>{
        this.ch.detectChanges();
      })
    )
  }

  public openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {width: "100%", height: "100%", maxWidth: "590px", maxHeight: "610px"});
    this.dialogRef.close();
  }

  private buildForm(): FormGroup{
    return this.formBuilder.group({
      'email': new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
}
