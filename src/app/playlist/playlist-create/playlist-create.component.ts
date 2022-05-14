import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
