import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  loadingBar: boolean;

  constructor(private AuthService: AuthServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.AuthService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.AuthService.clearToken();
      this.initForm();
      this.loadingBar = false;
    }
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess(): void {
    this.loadingBar = true;
    if (this.formGroup.valid) {
      this.AuthService.login(this.formGroup.value).toPromise()
        .then(result => {
          if (result.success) {
            this.AuthService.setJWT(result.token);
            this.AuthService.logged().toPromise()
            .then(resp => {
              this.AuthService.setRefreshToken(resp.authData.exp);
              this.router.navigate(['/']);
            })
            .catch(err => this.switchError(err))
            .finally(() => this.loadingBar = false);
          } else {
            this.showError('Credenciales no válidas');
          }
        })
        .catch(err => this.switchError(err));
    } else {
      this.showError('Los campos son obligatorios');
    }
  }

  switchError(err): void {
    if (err.status) {
      this.showError(err.message);
    } else {
      this.showError('El servidor no está disponible');
    }
  }

  showError(msg): void {
    this.loadingBar = false;
    this.snackBar.open(msg.trim().replace(/^\w/, (c) => c.toUpperCase()), 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
