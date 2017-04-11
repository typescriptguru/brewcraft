/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { SharedService } from './services/index';
import { Router } from '@angular/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {
    // console.log(localStorage.getItem('currentUser'));
  }

  public ngOnInit() {
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
