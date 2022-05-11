import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../layout/app-layout/app-layout.component';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {PlaylistDetailComponent} from './playlist-detail/playlist-detail.component';
import {PlaylistCreateComponent} from './playlist-create/playlist-create.component';
import {PlaylistUpdateComponent} from './playlist-update/playlist-update.component';
import {PlaylistDeleteComponent} from './playlist-delete/playlist-delete.component';


const routes: Routes = [
      {
        path: 'list',
        component: PlaylistListComponent
      },
      {
        path: 'detail',
        component: PlaylistDetailComponent
      },
      {
        path: 'create',
        component: PlaylistCreateComponent
      },
      {
        path: 'update',
        component: PlaylistUpdateComponent
      },
      {
        path: 'delete',
        component: PlaylistDeleteComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
