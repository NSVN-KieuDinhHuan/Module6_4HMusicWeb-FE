import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../layout/app-layout/app-layout.component';
import {CreatedSongListComponent} from './created-song-list/created-song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {UpdateSongComponent} from './update-song/update-song.component';


const routes: Routes = [
  {
    path: 'song',
    component: AppLayoutComponent,
    children: [
      { path: 'list', component: CreatedSongListComponent},
      { path: 'create', component: CreateSongComponent},
      { path: 'edit/:id', component: UpdateSongComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SongRoutingModule { }
