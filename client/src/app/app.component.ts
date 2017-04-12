import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService) {
    this.authService.af.auth.subscribe((auth) => {
      if(auth) {
        console.log('Login', auth);
      } else {
        console.log('Log out', auth);
      }
    })
  }
}
