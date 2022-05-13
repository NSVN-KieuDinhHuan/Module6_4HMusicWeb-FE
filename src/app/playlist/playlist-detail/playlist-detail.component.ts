import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  currentUser: UserToken = {};
  playlist: PlayList = {};

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  getPlaylistById(id) {
    this.playlistService.getPlaylistById(id).subscribe((playlist) => {
      this.playlist = playlist;
    });
  }
}
