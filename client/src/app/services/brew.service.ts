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

  unsubscribe() {
    this.brewSubject.unsubscribe();
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
    localStorage.setItem('brew', JSON.stringify(brew));
    this.timer = setInterval(() => {
      var brew = this.getBrew();
      brew.time_counter--;
      if (brew.time_counter == 0) {
        brew.status = NOT_STARTED;
        brew.step++;
        clearInterval(this.timer);
      }
      this.setBrew(brew);
    }, 10);
    localStorage.setItem('timer', JSON.stringify(this.timer));
  }

  stopBrew() {
    clearInterval(this.timer);
  }

  isCompleted() {
    var brew = this.getBrew();
    var total_steps = brew.recipe.steps.length;
    if (brew.step == total_steps + 1) {
      return true;
    }
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
    var user = this.sharedService.getUser();
    var brewArchive = new BrewArchive();
    brewArchive.recipe_name = this.getBrew().recipe.name;
    brewArchive.brewer_uid = user.uid;
    brewArchive.brewer_name = user.fullname;

    return this.http.post(url, { brew: brewArchive })
      .toPromise()
      .then(res => res.json());
  }

  getBrewArchive() {
    var url = CONFIG.SERVER_URL + '/brewday/get-archive/' + this.sharedService.getUserUid();
    return this.http.get(url)
      .toPromise()
      .then(res => res.json());
  }

  completeBrew(brew: BrewArchive) {
    var url = CONFIG.SERVER_URL + '/brewday/complete-brew';
    return this.http.put(url, brew)
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

export class BrewArchive {
  uid: String;
  recipe_name: string;
  brewer_name: string;
  brewer_uid: string;
  brew_date: Date;
  fermentation_date: Date;
  carbonation_date: Date;
  status: Boolean;

  constructor() {
    this.recipe_name = "";
    this.brewer_name = "";
    this.brewer_uid = "";
    this.brew_date = new Date();
    this.fermentation_date = new Date();
    this.carbonation_date = new Date();
    this.status = false;
  }
}