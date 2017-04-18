import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';

import { AuthGuard } from '../services/index';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: BootstrapComponent,
    children: [
      {
        path: '',
        component: MyRecipesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [MyRecipesComponent, BootstrapComponent],
})
export class DashboardModule { }
