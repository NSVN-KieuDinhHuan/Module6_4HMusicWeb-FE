import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../layout/app-layout/app-layout.component';
import {CreatedSongListComponent} from './created-song-list/created-song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {UpdateSongComponent} from './update-song/update-song.component';
import {AuthGuard} from '../helper/auth-guard';
import {AlbumListComponent} from './album-list/album-list.component';


const routes: Routes = [
  {
    path: 'song',
    component: AppLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'list', component: CreatedSongListComponent, canActivate: [AuthGuard]},
      { path: 'create', component: CreateSongComponent, canActivate: [AuthGuard]},
      { path: 'edit/:id', component: UpdateSongComponent, canActivate: [AuthGuard]},
      { path: 'album', component: AlbumListComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
