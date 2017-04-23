import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ImageUploadModule } from 'ng2-imageupload';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard, ChatService } from '../services/index';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ProfileWidgetComponent } from './components/widgets/profile-widget/profile-widget.component';
import { GuildWidgetComponent } from './components/widgets/guild-widget/guild-widget.component';
import { BrewOfTheDayWidgetComponent } from './components/widgets/brew-of-the-day-widget/brew-of-the-day-widget.component';
import { TipOfTheDayWidgetComponent } from './components/widgets/tip-of-the-day-widget/tip-of-the-day-widget.component';
import { VideosWidgetComponent } from './components/widgets/videos-widget/videos-widget.component';
import { TipsWidgetComponent } from './components/widgets/tips-widget/tips-widget.component';
import { FavoriteBrewWidgetComponent } from './components/widgets/favorite-brew-widget/favorite-brew-widget.component';
import { BlogWidgetComponent } from './components/widgets/blog-widget/blog-widget.component';
import { GuildComponent } from './guild/guild.component';


const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'guild',
        component: GuildComponent
      }
    ],
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ImageUploadModule,
    // BusyModule.forRoot(
    //   new BusyConfig({
    //     message: '',
    //   }
    //   )
    // ),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ChatComponent, HeaderComponent, DashboardComponent, FooterComponent, HomeComponent, LeftSidebarComponent, RightSidebarComponent, ProfileWidgetComponent, GuildWidgetComponent, BrewOfTheDayWidgetComponent, TipOfTheDayWidgetComponent, VideosWidgetComponent, TipsWidgetComponent, FavoriteBrewWidgetComponent, BlogWidgetComponent, GuildComponent],
  providers: [ChatService]
})
export class DashboardModule { }
