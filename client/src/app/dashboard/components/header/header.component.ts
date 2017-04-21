import { Component, OnInit } from '@angular/core';
import { AuthService, SharedService, User } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  joinDate: String;

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    public router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    var date = new Date(this.user.joinDate);
    this.joinDate = date.getFullYear().toString();
  }

  logout() {
    this.authService.logout().then(data =>
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 400)
    );
  }
}
