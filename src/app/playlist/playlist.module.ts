import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistCreateComponent } from './playlist-create/playlist-create.component';
import { PlaylistUpdateComponent } from './playlist-update/playlist-update.component';
import { PlaylistDeleteComponent } from './playlist-delete/playlist-delete.component';


@NgModule({
  declarations: [PlaylistListComponent, PlaylistDetailComponent, PlaylistCreateComponent, PlaylistUpdateComponent, PlaylistDeleteComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule
  ]
})
export class PlaylistModule { }
