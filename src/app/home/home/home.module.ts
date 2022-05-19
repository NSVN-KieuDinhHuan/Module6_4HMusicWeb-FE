import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomepageComponent} from '../homepage/homepage.component';
import {DetailSongComponent} from '../../song/detail-song/detail-song.component';
import {CreatedSongListComponent} from '../../song/created-song-list/created-song-list.component';
import {DeleteSongComponent} from '../../song/delete-song/delete-song.component';
import {UpdateSongComponent} from '../../song/update-song/update-song.component';
import {CreateSongComponent} from '../../song/create-song/create-song.component';
import {PlaylistCreateComponent} from '../../playlist/playlist-create/playlist-create.component';
import {PlaylistUpdateComponent} from '../../playlist/playlist-update/playlist-update.component';
import {PlaylistDetailComponent} from '../../playlist/playlist-detail/playlist-detail.component';
import {PlaylistDeleteComponent} from '../../playlist/playlist-delete/playlist-delete.component';
import {PlaylistListComponent} from '../../playlist/playlist-list/playlist-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArtistsListComponent} from '../../artists/artists-list/artists-list.component';
import {ArtistDetailComponent} from '../../artists/artist-detail/artist-detail.component';


@NgModule({
  declarations: [HomepageComponent,
  DetailSongComponent,
  CreatedSongListComponent,
  DeleteSongComponent,
  UpdateSongComponent,
  CreateSongComponent,
  PlaylistCreateComponent,
  PlaylistUpdateComponent,
  PlaylistDetailComponent,
  PlaylistDeleteComponent,
  PlaylistListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class HomeModule { }
