import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppSiderbarComponent } from './layout/app-siderbar/app-siderbar.component';
import { AppNavbarComponent } from './layout/app-navbar/app-navbar.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppPlaySongComponent } from './layout/app-play-song/app-play-song.component';
import {SongModule} from './song/song.module';
import { LoginComponent } from './auth/login/login.component';
import {PlaylistModule} from './playlist/playlist.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppSiderbarComponent,
    AppNavbarComponent,
    AppLayoutComponent,
    AppPlaySongComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SongModule,
    PlaylistModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
