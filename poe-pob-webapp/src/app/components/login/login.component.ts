import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './../../services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private AuthService: AuthServiceService) { }

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
          console.log(result);
          if (result.success) {
            alert(result.message);
          } else {
            alert(result.message);
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
