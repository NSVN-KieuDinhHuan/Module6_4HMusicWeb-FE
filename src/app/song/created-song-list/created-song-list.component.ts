import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {PlayService} from '../../service/playmusic/play.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-created-song-list',
  templateUrl: './created-song-list.component.html',
  styleUrls: ['./created-song-list.component.css']
})
export class CreatedSongListComponent implements OnInit {

  currentUser: UserToken = {};
  songs: Song[] = [];
  constructor(private songService: SongService,
              private authenticationService: AuthenticationService,
              private playService: PlayService,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllCreatedSongbyUser();
  }
  playSongById(id) {
    this.songService.getSongById(id).subscribe((songsFromBE) => {
      this.playService.playSong ([songsFromBE]) ;
    });
  }
 getAllCreatedSongbyUser() {
   this.songService.getAll(this.currentUser.id).subscribe((songsFromBE) => {
     this.songs = songsFromBE;
   });
 }
  logout() {
    this.authenticationService.logout();
  }
 editSong(id) {
   this.router.navigateByUrl('/song/edit/' + id);
 }
}
