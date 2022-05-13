import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AppPlaySongComponent} from './layout/app-play-song/app-play-song.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'play' , component: AppPlaySongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
