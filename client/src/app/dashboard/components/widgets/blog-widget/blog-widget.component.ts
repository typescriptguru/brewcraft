import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Post, PostService, User, AuthService, SharedService } from '../../../../services';
import * as firebase from 'firebase';

@Component({
  selector: 'app-blog-widget',
  templateUrl: './blog-widget.component.html',
  styleUrls: ['./blog-widget.component.css']
})
export class BlogWidgetComponent implements OnInit {

  db: firebase.database.Database;
  postRef: firebase.database.Reference;
  maxPosts: number = 4;
  posts: Post[];

  busy: firebase.Promise<any>;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private postService: PostService,
    private sanitizer: DomSanitizer) {
    this.db = firebase.database();
  }

  ngOnInit() {
    this.posts = [];
    this.getPosts();
  }
  loadMore() {
    this.maxPosts += 4;
    this.getPosts();
  }

  getPosts() {
    this.postRef = this.db.ref('posts');

    this.busy = this.postRef.limitToFirst(+this.maxPosts).once('value', (snapshot) => {
      if (snapshot.val() == null)
        return;
      let count = 0;
      for (var key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          var element = snapshot.val()[key];
          count++;
          if(element.mediaType == 'video'){
             element.url =  this.sanitizer.bypassSecurityTrustResourceUrl(element.url + '?controls=0');
          }
          if (count > this.posts.length)
            this.posts.push(element);
          console.log(element.mediaType);
        }
      }
    })
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


  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
