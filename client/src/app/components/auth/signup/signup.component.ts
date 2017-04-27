import { Component, OnInit } from '@angular/core';
import { AuthService, User, SharedService } from '../../../services';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
    public flashMessage: FlashMessagesService,
    public sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
  }

  signup(username, lastname, email, password, confirmpassword) {

    console.log(password, confirmpassword, email)
    this.matchPassword = true;
    this.validPassword = true;
    this.emptyUsername = false;
    this.onEmail = true;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.onEmail = re.test(this.user.email);

    if (username == "" || username == undefined || lastname == "" || lastname==undefined)
      this.emptyUsername = true;


    re = /^(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    this.validPassword = re.test(password);

    if (password != confirmpassword && this.validPassword)
      this.matchPassword = false;

    if (this.onEmail && this.matchPassword && this.validPassword && !this.emptyPassword) {
      var self = this;
      this.user.fullname = this.user.fullname + ' ' + lastname;
      this.authService.signupWithEmailAndPassword(this.user)
        .then((res) => {
          this.user.uid = res.uid;
          this.user.credential_provider = "password";
          this.user.joinDate = new Date();
          this.user.locked = false;
          this.authService.addUserToDatabase(this.user).then(res => {
            this.authService.getUserByUid(this.user.uid)
              .then(res => {
                this.sharedService.setUser(res.data);
                this.router.navigate(['/dashboard']);
              })
          });
        })
        .catch(function (error) {
          self.flashMessage.show(error.message,
            { cssClass: 'alert-danger', timeout: 5000 });
        });
    }

  }
  loginWithFacebook() {
    var self = this;
    this.authService.loginWithFacebook()
      .then(res => {
        this.user.credential_provider = "facebook";
        this.user.fullname = res.auth.displayName;
        this.user.email = res.auth.email;
        this.user.photoUrl = res.auth.photoURL;
        this.user.uid = res.uid;
        this.user.password = null;
        this.authService.addUserToDatabase(this.user)
          .then(res => {
            this.authService.getUserByUid(this.user.uid)
              .then(res => {
                if (res.success) {
                  this.sharedService.setUser(res.data);
                  this.router.navigate(['/dashboard']);
                }
              })
          });
      })
      .catch(err => {
        self.flashMessage.show(err.message,
          { cssClass: 'alert-danger', timeout: 5000 });
      })
  }
  loginWithGoogle() {
    var self = this;
    this.authService.loginWithGoogle()
      .then(res => {
        this.user.credential_provider = "google";
        this.user.fullname = res.auth.displayName;
        this.user.email = res.auth.email;
        this.user.photoUrl = res.auth.photoURL;
        this.user.uid = res.uid;
        this.user.password = null;
        this.authService.addUserToDatabase(this.user)
          .then(res => {
            this.authService.getUserByUid(this.user.uid)
              .then(res => {
                if (res.success) {
                  this.sharedService.setUser(res.data);
                  this.router.navigate(['/dashboard']);
                }
              })
          });
      })
      .catch(err => {
        self.flashMessage.show(err.message,
          { cssClass: 'alert-danger', timeout: 5000 });
      })
  }
}
