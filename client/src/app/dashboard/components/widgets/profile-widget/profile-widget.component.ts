import { Component, OnInit } from '@angular/core';
import { SharedService, User, AuthService } from '../../../../services';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {

  user: User;
  joinDate: String;

  constructor(private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    var date = new Date(this.user.joinDate);
    this.joinDate = date.getFullYear().toString();
    console.log(this.user.followed);
  }

}
