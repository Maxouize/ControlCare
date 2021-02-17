import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createUser } from 'src/app/core/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private return: string = "";

  constructor(private authService: AuthenticationService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/planning');
    if (this.authService.getCurrentUser()) {
      this.router.navigateByUrl(this.return);
    }
  }

  initForm(): void {
    console.log(this.authService.getCurrentUser());
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userAuthentication = createUser(this.loginForm.value);
      console.log(userAuthentication);
      this.authService.setCurrentUserWithToken(userAuthentication, '');
      this.router.navigateByUrl(this.return);
      // this.authService.authenticate(userAuthentication).subscribe(respAuth => {
      //   if (respAuth.token && respAuth.token === 'BadCredential') {
      //     this._snackBar.open('L\'identifiant ou le mot de passe est incorrect.', 'Fermer', {
      //       duration: 3000
      //     });
      //   } else {
      //     this.authService.setCurrentUserWithToken(userAuthentication, respAuth.token, respAuth.isManager, respAuth.role);
      //     if (this.authService.getStoredUserWithToken()) {
      //       this.router.navigateByUrl(this.return);
      //     }
      //   }
      // },
      //   error => {
      //     this._snackBar.open('L\'identifiant ou le mot de passe est incorrect.', 'Fermer', {
      //       duration: 3000
      //     });
      //     this.loading = !this.loading;
      //   }, () => {
      //     this.loading = !this.loading;
      //   });
    }
  }

  onClickFC() {
    this._snackBar.open('Demande de connexion France Connect.', 'Fermer', {
      duration: 5000
    });
  }
}
