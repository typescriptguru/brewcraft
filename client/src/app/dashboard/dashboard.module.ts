import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';

import { AuthGuard, ChatService } from '../services/index';
import { ChatComponent } from './chat/chat.component';


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
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [MyRecipesComponent, BootstrapComponent, ChatComponent],
  providers: [ChatService]
})
export class DashboardModule { }
