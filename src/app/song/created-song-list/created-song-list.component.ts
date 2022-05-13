import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';

@Component({
  selector: 'app-created-song-list',
  templateUrl: './created-song-list.component.html',
  styleUrls: ['./created-song-list.component.css']
})
export class CreatedSongListComponent implements OnInit {

  currentUser: UserToken = {};
  songs: Song[] = [];
  constructor(private songService: SongService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllCreatedSongbyUser();
  }
 getAllCreatedSongbyUser() {
   this.songService.getAll(this.currentUser.id).subscribe((songsFromBE) => {
     this.songs = songsFromBE;
   });
 }
  logout() {
    this.authenticationService.logout();
  }
 playMusic() {

 }
}
