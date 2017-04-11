import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { RegisterComponent } from './components/register';
import { LoginComponent } from './components/login';
import { NoContentComponent } from './components/no-content';
import { AuthGuard } from './services/index';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
//  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent },
];
