import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PostService, User, AuthService, SharedService, Recipe, RecipeService } from '../../services';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, PipeTransform {

  postContent: string = "";
  mediaType: string = "none";
  errorMsg: string = "";

  recipes: Recipe[];

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
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.recipes = [];
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
    this.errorMsg = "";
  }

  onUploadPhoto() {
    
  }

  onLinkVideo(url) {
    let videoID = this.getYoutubeEmbedURL(url);
    if (videoID == "error") {
      this.errorMsg = "The video url is invalid.";
      console.log(videoID);
      return;
    }
    this._videoUrl = 'https://www.youtube.com/embed/' + this.getYoutubeEmbedURL(url);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._videoUrl);
    this.mediaUrl = null;
    this.mediaType = "video";
    $('#media-upload').modal('toggle');
  }

  selected(imageResult: ImageResult) {
    var src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.imageError = null;
    if (imageResult.error) {
      this.errorMsg = "Only jpg, png, jpeg files are supported";
      return;
    }

    $('#media-upload').modal('toggle');
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
  getTimeDiff(date: Date) {
    var today = new Date();
    var diffMs = (today.getTime() - new Date(date).getTime()); // milliseconds between now & Christmas

    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if(diffDays != 0) 
      return diffDays + ' days ago';
    if(diffHrs != 0) 
      return diffHrs + ' hours ago';
    if(diffMins != 0)
      return diffMins + ' mins ago';
    else 
      return Math.floor(diffMs / 1000) + ' secs ago';
  }

  browseRecipes(keyword) {
    this.recipeService.searchRecipes(keyword)
      .then(res => this.recipes = res.data);
  }
}
