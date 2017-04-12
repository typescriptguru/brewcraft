import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  isSignup: Boolean = false;

  constructor(private authService: AuthService,
    public flashMessage: FlashMessagesService,) { }

  ngOnInit() {
  }

  signup() {
      this.authService.signupWithEmailAndPassword(this.user)
      .then((res) => {
        this.flashMessage.show('You have been successfully registered ',
          { cssClass: 'alert-success', timeout: 3000 });
      })
      .catch(function(error) {
        console.log(error)
      });
  }
}
