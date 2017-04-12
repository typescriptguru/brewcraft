import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from "firebase";

@Injectable()
export class AuthService {
  constructor(public af: AngularFire) {
  }



  signupWithEmailAndPassword(user: User) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  loginWithEmailAndPassword(user: User) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }
  logout() {
    return this.af.auth.logout();
  }
}

export class User {
  username: string;
  email: string;
  password: string;
  uid: string;
}
