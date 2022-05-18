import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  currentUser: UserToken = {};
  allPlaylists: PlayList[] = [];
  allPlaylistsByUser: PlayList[] = [];

  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService,
              private jsService:JsService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllPlaylists();
    this.getAllPlaylistsByUser();
    this.jsService.jsfile()
  }

  getAllPlaylists() {
    this.playlistService.getAllPlaylist().subscribe((playlists) => {
      this.allPlaylists = playlists;
    });
  }

  getAllPlaylistsByUser() {
    this.playlistService.getAllPlaylistByUser(this.currentUser.id).subscribe((playlists) => {
      this.allPlaylistsByUser = playlists;
    });
  }
}
