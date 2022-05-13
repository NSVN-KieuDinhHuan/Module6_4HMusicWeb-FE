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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {AuthModule} from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppSiderbarComponent,
    AppNavbarComponent,
    AppLayoutComponent,
    AppPlaySongComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SongModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SongModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
