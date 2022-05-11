import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreatedSongListComponent } from './created-song-list/created-song-list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';



@NgModule({
  declarations: [CreatedSongListComponent, CreateSongComponent, UpdateSongComponent, DeleteSongComponent],
  imports: [
    CommonModule,
    SongRoutingModule
  ]
})
export class SongModule { }
