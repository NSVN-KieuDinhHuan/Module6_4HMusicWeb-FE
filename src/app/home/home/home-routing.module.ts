import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../../layout/app-layout/app-layout.component';
import {CreatedSongListComponent} from '../../song/created-song-list/created-song-list.component';
import {CreateSongComponent} from '../../song/create-song/create-song.component';
import {AuthGuard} from '../../helper/auth-guard';
import {UpdateSongComponent} from '../../song/update-song/update-song.component';
import {DeleteSongComponent} from '../../song/delete-song/delete-song.component';
import {DetailSongComponent} from '../../song/detail-song/detail-song.component';
import {HomepageComponent} from '../homepage/homepage.component';
import {PlaylistListComponent} from '../../playlist/playlist-list/playlist-list.component';
import {PlaylistCreateComponent} from '../../playlist/playlist-create/playlist-create.component';
import {PlaylistUpdateComponent} from '../../playlist/playlist-update/playlist-update.component';
import {PlaylistDeleteComponent} from '../../playlist/playlist-delete/playlist-delete.component';
import {PlaylistDetailComponent} from '../../playlist/playlist-detail/playlist-detail.component';
import {ArtistsListComponent} from '../../artists/artists-list/artists-list.component';
import {UpdateProfileComponent} from '../../auth/update-profile/update-profile.component';
import {SearchComponent} from '../search/search.component';
import {ArtistDetailComponent} from '../../artists/artist-detail/artist-detail.component';
import {ArtistCreateComponent} from '../../artists/artist-create/artist-create.component';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomepageComponent},
      {
        path: 'playlist',
        children: [
          { path: 'list', component: PlaylistListComponent},
          { path: 'create', component: PlaylistCreateComponent, canActivate: [AuthGuard]},
          { path: 'edit/:id', component: PlaylistUpdateComponent, canActivate: [AuthGuard]},
          { path: 'delete/:id', component: PlaylistDeleteComponent, canActivate: [AuthGuard]},
          { path: 'detail/:id', component: PlaylistDetailComponent},

        ]
      },
      {
        path: 'song',
        children: [
          { path: 'list', component: CreatedSongListComponent},
          { path: 'create', component: CreateSongComponent, canActivate: [AuthGuard]},
          { path: 'edit/:id', component: UpdateSongComponent, canActivate: [AuthGuard]},
          { path: 'delete/:id', component: DeleteSongComponent, canActivate: [AuthGuard]},
          { path: 'detail/:id', component: DetailSongComponent}
        ]
      },
      {
        path: 'artist',
        children: [
          { path: 'list', component: ArtistsListComponent},
          { path: 'detail/:id', component: ArtistDetailComponent},
          {path: 'create', component: ArtistCreateComponent}
        ]
      },
      {
        path: 'user',
        children: [
          {path: 'update/:id', component: UpdateProfileComponent}
        ]
      },
      {path: 'search/:q', component: SearchComponent}


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
