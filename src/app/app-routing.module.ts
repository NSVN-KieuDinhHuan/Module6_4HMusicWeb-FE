import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AppPlaySongComponent} from './layout/app-play-song/app-play-song.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {HomepageComponent} from './home/homepage/homepage.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
  // {
  //   path: '',
  //   component: AppLayoutComponent,
  //   loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
