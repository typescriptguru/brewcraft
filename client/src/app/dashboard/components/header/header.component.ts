import { Component, OnInit } from '@angular/core';
import { AuthService, SharedService, User } from '../../../services';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  joinDate: String;
  db: firebase.database.Database;

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    public router: Router) {
    this.db = firebase.database();
  }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    let uid = this.sharedService.getUserUid();
    this.db.ref('users/' + uid).on('value', (snapshot) => {
      this.user = snapshot.val();
      var date = new Date(this.user.joinDate);
      this.joinDate = date.getFullYear().toString();
    })
  }

  logout() {
    this.authService.logout().then(data =>
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 400)
    );
  }

  floor(val) {
    return Math.floor(val);
  }
}
