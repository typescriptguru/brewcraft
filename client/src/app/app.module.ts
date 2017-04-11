import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { ImageUploadModule } from 'ng2-imageupload';
import { ModalGalleryModule } from 'angular-modal-gallery';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { RegisterComponent } from './components/register';
import { LoginComponent } from './components/login';
import { NoContentComponent } from './components/no-content';
import { ImageModal } from 'angular2-image-popup/directives/angular2-image-popup/image-modal-popup';

import { UserService, SharedService, AuthGuard, ImageService } from './services/index';

import '../styles/styles.scss';
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NoContentComponent, 
    ImageModal,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    GrowlModule,
    DialogModule,
    PaginatorModule,
    ImageUploadModule,
    ModalGalleryModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard, UserService, SharedService, ImageService],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) { }

}
