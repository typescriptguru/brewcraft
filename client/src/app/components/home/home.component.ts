import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  login(){
  }

}
