import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isSignup: Boolean = false;

  constructor(private authService: AuthService,
    public flashMessage: FlashMessagesService,) { }

  ngOnInit() {
  }

  login() {
      var self = this;
      this.authService.loginWithEmailAndPassword(this.user)
      .then((res) => {
        self.flashMessage.show('You have been successfully logged in ',
          { cssClass: 'alert-success', timeout: 5000 });
      })
      .catch(function(error) {
        self.flashMessage.show(error.message,
          { cssClass: 'alert-danger', timeout: 5000 });
      });
  }
}
