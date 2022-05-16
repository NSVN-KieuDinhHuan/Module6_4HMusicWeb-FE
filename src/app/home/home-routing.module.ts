import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {AppLayoutComponent} from '../layout/app-layout/app-layout.component';
import {PlaylistListComponent} from '../playlist/playlist-list/playlist-list.component';
import {PlaylistCreateComponent} from '../playlist/playlist-create/playlist-create.component';
import {PlaylistUpdateComponent} from '../playlist/playlist-update/playlist-update.component';
import {PlaylistDeleteComponent} from '../playlist/playlist-delete/playlist-delete.component';
import {PlaylistDetailComponent} from '../playlist/playlist-detail/playlist-detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomepageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
