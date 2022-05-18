import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreatedSongListComponent } from './created-song-list/created-song-list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailSongComponent } from './detail-song/detail-song.component';




@NgModule({
  declarations: [CreatedSongListComponent, CreateSongComponent, UpdateSongComponent, DeleteSongComponent, DetailSongComponent],
    imports: [
        CommonModule,
        SongRoutingModule,
        ReactiveFormsModule,
        FormsModule,

    ]
})
export class SongModule { }
