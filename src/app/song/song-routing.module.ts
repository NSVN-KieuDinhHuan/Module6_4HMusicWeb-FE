import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../layout/app-layout/app-layout.component';
import {CreatedSongListComponent} from './created-song-list/created-song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {UpdateSongComponent} from './update-song/update-song.component';
import {AuthGuard} from '../helper/auth-guard';


const routes: Routes = [
  {
    path: 'song',
    component: AppLayoutComponent,
    children: [
      { path: 'list', component: CreatedSongListComponent},
      { path: 'create', component: CreateSongComponent, canActivate: [AuthGuard]},
      { path: 'edit/:id', component: UpdateSongComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
