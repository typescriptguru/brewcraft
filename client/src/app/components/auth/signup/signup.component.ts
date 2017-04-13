import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  isSignup: Boolean = false;

  emptyPassword: Boolean = false;
  matchPassword: Boolean = true;
  validPassword: Boolean = true;
  emptyUsername: Boolean = false;
  onEmail: Boolean = true;

  constructor(private authService: AuthService,
    public flashMessage: FlashMessagesService, ) { }

  ngOnInit() {
  }

  signup(username, email, password, confirmpassword) {

    console.log(password, confirmpassword)
    this.matchPassword = true;
    this.validPassword = true;
    this.emptyUsername = false;
    this.onEmail = true;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.onEmail = re.test(this.user.email);

    if(username == "" || username == undefined) 
      this.emptyUsername = true;


    re = /^(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    this.validPassword = re.test(password);

    if(password != confirmpassword && this.validPassword)
      this.matchPassword = false;

    if (this.onEmail && this.matchPassword && this.validPassword && !this.emptyPassword) {
      var self = this;
      this.authService.signupWithEmailAndPassword(this.user)
        .then((res) => {
          this.flashMessage.show('You have been successfully registered ',
            { cssClass: 'alert-success', timeout: 3000 });
        })
        .catch(function (error) {
          self.flashMessage.show(error.message,
            { cssClass: 'alert-danger', timeout: 5000 });
        });    }

  }
}
