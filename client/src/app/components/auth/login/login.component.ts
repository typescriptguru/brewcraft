import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isSignup: Boolean = false;

  onPassword: Boolean = true;
  onEmail: Boolean = true;

  constructor(private authService: AuthService,
    public flashMessage: FlashMessagesService, ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.onPassword = true;
    if (this.user.password == "" || this.user.password == null) {
      this.onPassword = false;
    }
    this.onEmail = re.test(this.user.email);
    if (this.onPassword === true && this.onEmail === true) {
      var self = this;
      this.authService.loginWithEmailAndPassword(this.user)
        .then((res) => {
          self.flashMessage.show('You have been successfully logged in ',
            { cssClass: 'alert-success', timeout: 5000 });
        })
        .catch(function (error) {
          self.flashMessage.show(error.message,
            { cssClass: 'alert-danger', timeout: 5000 });
          self.user.password = "";
        });
    }
  }
}
