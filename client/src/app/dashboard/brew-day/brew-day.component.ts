import { Component, OnInit } from '@angular/core';
import {BrewArchive, BrewService} from '../../services';

@Component({
  selector: 'app-brew-day',
  templateUrl: './brew-day.component.html',
  styleUrls: ['./brew-day.component.css']
})
export class BrewDayComponent implements OnInit {

  brews: BrewArchive[];

  constructor(
    private brewService: BrewService
  ) { }

  ngOnInit() {
    this.brewService.getBrewArchive()
      .then(res => {
        this.brews = res.data;
        console.log(this.brews);
      })
  }
  completeBrew(brew: BrewArchive) {
    this.brewService.completeBrew(brew)
      .then(res => {brew.status = true;})
  }
}
