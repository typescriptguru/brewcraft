import { Component, OnInit } from '@angular/core';
import { PostService, User, AuthService, SharedService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postContent: string = "";

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private postService: PostService
  ) { }

  ngOnInit() {
  }

  post() {
    if(this.postContent == "")
      return;
    let user = this.sharedService.getUser();
    this.postService.post(user, this.postContent)
      .then(res => {
        if(res.success)
          this.postContent = "";
      });
  }

}
