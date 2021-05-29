import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {

  constructor(private AuthService: AuthServiceService) { }

  ngOnInit(): void {

  }

  exit(): void {
    this.AuthService.logOut();
  }

}
