import { Component, OnInit } from '@angular/core';
import {WordpressService, Article} from '../../services';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  tips: Article[];

  constructor(
    private wordpressService: WordpressService
  ) { }

  ngOnInit() {
  }

  getTips() {
    this.wordpressService.getTips()
      .then(res => {
        this.tips = res.data;
      });
  }
}
