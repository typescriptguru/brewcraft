import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { PostService, User, AuthService, SharedService } from '../../services';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, PipeTransform  {

  postContent: string = "";
  mediaType: string = "none";

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 600
  };
  mediaUrl: string = null;
  videoUrl: SafeResourceUrl = null;
  _videoUrl: string = null;
  imageError: any;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  post() {
    if (this.postContent == "")
      return;
    let user = this.sharedService.getUser();

    let mediaData = this.mediaUrl;
    if (this.mediaType == "video")
      mediaData = this._videoUrl;
      
    this.postService.post(user, this.postContent, this.mediaType, mediaData)
      .then(res => {
        this.postContent = "";
        this.mediaType = "none";
        this.mediaUrl = null;
        this.videoUrl = null;
      });
  }

  mediaUpload() {
    $('#media-upload').modal();
  }

  onUploadPhoto() {

  }

  onLinkVideo(url) {
    this._videoUrl = 'https://www.youtube.com/embed/' + this.getYoutubeEmbedURL(url);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._videoUrl);
    this.mediaUrl = null;
    this.mediaType = "video";
    console.log(this.videoUrl);
  }

  selected(imageResult: ImageResult) {
    var src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.imageError = null;
    if (imageResult.error) {
      this.imageError = imageResult.error;
      return;
    }
    this.mediaUrl = src;
    this.videoUrl = null;
    this.mediaType = "photo";
  }

  getYoutubeEmbedURL(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
