import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreatedSongListComponent } from './created-song-list/created-song-list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';
import {AlbumListComponent} from './album-list/album-list.component';



@NgModule({
  declarations: [CreatedSongListComponent, CreateSongComponent, UpdateSongComponent, DeleteSongComponent, AlbumListComponent],
  imports: [
    CommonModule,
    SongRoutingModule
  ]
})
export class SongModule { }
