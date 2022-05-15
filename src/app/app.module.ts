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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import {RegisterComponent} from './auth/register/register.component';
import {SongRoutingModule} from './song/song-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppSiderbarComponent,
    AppNavbarComponent,
    AppLayoutComponent,
    AppPlaySongComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SongModule,
    PlaylistModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
