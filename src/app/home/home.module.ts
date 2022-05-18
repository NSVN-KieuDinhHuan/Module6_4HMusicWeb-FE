import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {AppFooterComponent} from '../layout/app-footer/app-footer.component';
import {AppSiderbarComponent} from '../layout/app-siderbar/app-siderbar.component';
import {AppNavbarComponent} from '../layout/app-navbar/app-navbar.component';
import {AppPlaySongComponent} from '../layout/app-play-song/app-play-song.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
