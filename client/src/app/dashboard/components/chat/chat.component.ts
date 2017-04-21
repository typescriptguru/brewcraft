import { Component, OnInit, Input } from '@angular/core';
import { ChatService, Chat, User, AuthService } from '../../../services';
import * as firebase from "firebase";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  db: firebase.database.Database;
  me: User = null;
  chats: Chat[];
  @Input() mode: string;

  message: string;

  constructor(private chatService: ChatService, private authService: AuthService) {
    this.db = firebase.database();
  }

  ngOnInit() {
    this.chats = [];
    if (this.mode == "COMMUNITY") {
      var chatRef = this.db.ref('chats/community');
      chatRef.on('child_added', (snapshot) => {
        this.chats.push(snapshot.val());
        setTimeout(() => {
          var element = document.getElementById("chat-box");
          element.scrollTop = element.scrollHeight;
        }, 10);
      })
    } else {
      this.authService.getUser()
        .then(res => {
          this.me = res.data;
          var chatRef = this.db.ref('chats/guild/' + this.me.guildID);
          chatRef.on('child_added', (snapshot) => {
            this.chats.push(snapshot.val());
            setTimeout(() => {
              var element = document.getElementById("chat-box");
              element.scrollTop = element.scrollHeight;
            }, 10);
          })
        });
    }
  }

  sendChat() {
    if (this.message != "")
      this.chatService.sendChat(this.message, this.mode);
    this.message = "";
  }
}
