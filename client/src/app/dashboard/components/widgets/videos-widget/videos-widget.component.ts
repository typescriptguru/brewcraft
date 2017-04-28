import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Post, PostService, User, AuthService, SharedService } from '../../../../services';
import * as firebase from 'firebase';

@Component({
  selector: 'app-videos-widget',
  templateUrl: './videos-widget.component.html',
  styleUrls: ['./videos-widget.component.css']
})
export class VideosWidgetComponent implements OnInit {

  db: firebase.database.Database;
  postRef: firebase.database.Reference;
  videoUrl: any = null;

  constructor(
    private sanitizer: DomSanitizer) {
    this.db = firebase.database();
  }

  ngOnInit() {
    this.postRef = this.db.ref('posts');
    var self = this;

    this.postRef.orderByChild('mediaType').equalTo('video').limitToFirst(1).once('value', (snapshot) => {
      if (snapshot.val() == null)
        return;
        console.log(snapshot.val());
      let count = 0;
      let url;
      for (var key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          url = snapshot.val()[key].url;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url + '?controls=1');
        }
      }
    })
  }
}
