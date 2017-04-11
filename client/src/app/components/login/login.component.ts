import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, SharedService } from '../../services/index';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = null;
  msgs: Message[] = [];
  onRegister: Boolean = true;
  onEmail: Boolean = true;
  onLogin: Boolean = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.msgs = [];
    this.user = {};
  }
  ngOnInit(): void {

  }
  signin(): void {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.onRegister = true;
    if (this.user.username == null || this.user.password == null) {
      this.onRegister = false;
    }
    this.onEmail = re.test(this.user.username);
    if (this.onRegister === true && this.onEmail === true) {
      this.userService.Login(this.user)
        .then(res => {
          this.msgs = [];
          if (res.success) {
            this.router.navigate(['gallery']);
            this.sharedService.setUser(res.data.user);
          } else {
            this.onLogin = false;
          }
        });
    }
  }
  facebookAuth(): void {
    console.log('facebookAuth');
  }
}


