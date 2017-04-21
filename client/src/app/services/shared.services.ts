import { Injectable } from '@angular/core';
import { User } from './index';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    constructor() {
    }

    setUser(user: User) {
        delete user.password;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getUserUid() {
        return JSON.parse(localStorage.getItem('currentUser')).uid;
    }

    incRetry() {
        var retry = localStorage.getItem('retry');
        if(retry == null) {
            localStorage.setItem('retry', '1');
        } else {
            localStorage.setItem('retry', (Number.parseInt(retry) + 1).toString());
        }
        console.log(retry);
    }
    getRetry() {
        return Number.parseInt(localStorage.getItem('retry'));
    }
}
