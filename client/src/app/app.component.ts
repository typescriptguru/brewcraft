import { Component } from '@angular/core';
import { AuthService, SharedService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService, private sharedService: SharedService) {
    this.authService.af.auth.subscribe((auth) => {
      if(auth) {
        console.log('Login', auth);
        this.sharedService.setUser(auth.uid, auth.auth.email)
        this.authService.getUser();
      } else {
        console.log('Log out', auth);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('retry');
      }
    })
  }
}
