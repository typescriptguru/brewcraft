import { Injectable } from '@angular/core';
import { Recipe } from './index';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { SharedService } from './shared.services';
import { CONFIG } from '../common/config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

const NOT_STARTED = 0;
const IN_PROGRESS = 1;
const COMPLETED = 2;
const PAUSE = 3;

@Injectable()
export class BrewService {

  private brewSubject = new Subject<Brew>();
  private timer;

  constructor(
    private http: Http,
    private sharedService: SharedService
  ) {

  }

  setRecipe(recipe: Recipe) {
    var brew = new Brew();
    brew.recipe = recipe;
    this.setBrew(brew);
  }

  getRecipe() {
    return this.getBrew().recipe;
  }

  brewListner(): Observable<Brew> {
    return this.brewSubject.asObservable();
  }

  setStep(step) {
    var brew = this.getBrew();
    brew.step = step;
    brew.status = NOT_STARTED;
    brew.time_counter = brew.recipe.steps[step - 1].step_time * 60;
    this.setBrew(brew);
  }

  processBrew() {
    var brew = this.getBrew();
    brew.status = IN_PROGRESS;
    this.setBrew(brew);
    this.timer = setInterval(() => {
      var brew = this.getBrew();
      brew.time_counter--;
      if (brew.time_counter == 0) {
        brew.status = NOT_STARTED;
        brew.step++;
        clearInterval(this.timer);
      }
      this.setBrew(brew);
    }, 1);
    localStorage.setItem('timer', JSON.stringify(this.timer));
  }

  stopBrew() {
    clearInterval(this.timer);
  }

  isCompleted() {
    var brew = this.getBrew();
    var total_steps = brew.recipe.steps.length;
    if (brew.step == total_steps + 1)
      return true;
    else false;
  }

  getBrew(): Brew {
    return JSON.parse(localStorage.getItem('brew'));
  }
  setBrew(brew) {
    localStorage.setItem('brew', JSON.stringify(brew));
    this.brewSubject.next(brew);
  }

  submit() {
    var url = CONFIG.SERVER_URL + '/brewday/add';
    var userID = this.sharedService.getUserUid();
    return this.http.post(url, { userID: userID })
      .toPromise()
      .then(res => res.json());
  }
}

export class Brew {
  recipe: Recipe;
  step: number;
  status: number;
  time_counter: number;
  constructor() {
    this.step = 1;
    this.status = NOT_STARTED;
    this.time_counter = 0;
  }
}