import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { PostService, User, AuthService, SharedService } from '../../services';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postContent: string = "";
  mediaType: string = "none";

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 600
  };
  mediaUrl: string = null;
  imageError: any;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private postService: PostService
  ) { }

  ngOnInit() {
  }

  post() {
    if (this.postContent == "")
      return;
    let user = this.sharedService.getUser();
    this.postService.post(user, this.postContent, this.mediaType, this.mediaUrl)
      .then(res => {
        this.postContent = "";
        this.mediaType = "none";
        this.mediaUrl = null;
      });
  }

  mediaUpload() {
    $('#media-upload').modal();
  }

  onUploadPhoto() {

  }

  onLinkVideo() {

  }

  selected(imageResult: ImageResult) {
    this.mediaUrl = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.imageError = null;
    if (imageResult.error) {
      this.imageError = imageResult.error;
      return;
    }
    this.mediaType = "photo";
  }
}
