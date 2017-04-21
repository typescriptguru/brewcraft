import { Component } from '@angular/core';
import { AuthService, SharedService } from './services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService, private sharedService: SharedService, private router: Router) {
    this.authService.af.auth.subscribe((auth) => {
      if (auth) {
      } else {
        console.log('Log out', auth);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('retry');
      }
    })
  }
}
