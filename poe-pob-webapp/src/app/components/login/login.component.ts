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

  constructor(private AuthService: AuthServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.loadingBar = false;
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
            this.router.navigateByUrl('/');
          } else {
            this.showError('Credenciales no válidas');
          }
        })
        .catch(err => {
          if (err.status) {
            this.showError(err.message);
          } else {
            this.showError('El servidor no está disponible');
          }
        })
        .finally(() => this.loadingBar = false);
    }
  }

  showError(msg): void {
    this._snackBar.open(msg.trim().replace(/^\w/, (c) => c.toUpperCase()), 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
