import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public flashMessage: FlashMessagesService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout().then((data) => {
      this.flashMessage.show('You are logged out',
        { cssClass: 'alert-success', timeout: 3000 });
    });
  }
}
