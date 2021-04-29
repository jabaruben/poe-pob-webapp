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

  constructor(private AuthService: AuthServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess(): void {
    if (this.formGroup.valid) {
      this.AuthService.login(this.formGroup.value).toPromise()
        .then(result => {
          if (result.success) {
            this.router.navigateByUrl('/');
          } else {            
            this._snackBar.open(result.message.toUpperCase(), 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        })
        .catch(err => {
          if (err.status) {
            alert(err.message);
          } else {
            alert(`${err.url} is not available!`);
          }
        });
    }
  }
}
