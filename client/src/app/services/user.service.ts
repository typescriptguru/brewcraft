import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';
import { CONFIG } from '../common/config';
import { contentHeaders } from '../common/headers';

@Injectable()
export class UserService {
  constructor(public http: Http) {

  }

  handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
  //////////    account register   //////////
  signup(user: User): Promise<any> {
    console.log(user);
    let request_url = CONFIG.SERVER_URL + '/auth/signup';
    let data = {
      username: user.username,
      password: user.password,
      fisrname: user.firstname,
      lastname: user.secondname,
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }
  /////////////    account Login   ////////////

  Login(user: User): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/auth/login/';
    let data = {
      username: user.username,
      password: user.password,
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }
  ///////////////     Forgot password    /////////////////

  Forgot(user: User): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/auth/forgot-password/';
    let data = {
      username: user.username
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }

  ///////////////     change password    /////////////////

  change(password: any, token: any): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/auth/reset-password/' + token;
    let data = {
      password: password
    };
    return this.http.post(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }
  ///////////////     get uers    /////////////////

  getUser(id: String): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/accounts/get/' + id;
    return this.http.get(request_url)
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }

  ////////////////  user update   /////////////////

  updateUser(user: User, id: String): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/accounts/update/' + id;
    let data = {
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      secondname: user.secondname,
      photo: user.photo
    };
    return this.http.put(request_url, data, { headers: contentHeaders })
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }


  ///////////////////////  delete  user   ////////////////////

  deleteUser(id: String): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/accounts/close/' + id;
    return this.http.delete(request_url)
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }


  /////////////////////////  get users   ///////////////////////

  getUsers(): Promise<any> {
    let request_url = CONFIG.SERVER_URL + '/accounts/get/';
    return this.http.get(request_url)
      .toPromise()
      .then(res => { return res.json(); })
      .catch(this.handleError);
  }
}
