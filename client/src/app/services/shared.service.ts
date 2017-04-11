import { Injectable } from '@angular/core';
import { User } from './index';

@Injectable()
export class SharedService {

    constructor() {
    }
    getUserID(): String {
        return this.getUser()._id;
    }

    setUserID(userID: String) {
        localStorage.setItem('userID', JSON.stringify(userID));
    }

    getFlag(): Boolean {
        let Flag = JSON.parse(localStorage.getItem('Flag'));
        return Flag;
    }

    setFlag(Flag: Boolean) {
        localStorage.setItem('Flag', JSON.stringify(Flag));
    }

    getUser(): User {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
    }

    setUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getSelectedMenu(): string {
        let menu = JSON.parse(localStorage.getItem('selectedMenu'));
        return menu;
    }

    setSelectedMenu(menu: string) {
        localStorage.setItem('selectedMenu', JSON.stringify(menu));
    }
}
