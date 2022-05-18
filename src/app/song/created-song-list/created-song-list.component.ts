import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {PlayService} from '../../service/playmusic/play.service';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';
declare var $: any;
@Component({
  selector: 'app-created-song-list',
  templateUrl: './created-song-list.component.html',
  styleUrls: ['./created-song-list.component.css']
})
export class CreatedSongListComponent implements OnInit {

  currentUser: UserToken = {};
  songs: Song[] = [];
  songPlayList: Song[] = [];
  allSongAllUser:Song[] = [];
  views:number;
  constructor(private songService: SongService,
              private authenticationService: AuthenticationService,
              private playService: PlayService,
              private jsService:JsService,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  addviews(songID){
    this.songService.addview(songID).subscribe(() => {
      this.getAllCreatedSongbyUser();
    });
  }
  ngOnInit() {
    this.getAllCreatedSongbyUser();
    this.playService.configVolume();
    this.getAllSong()
    this.jsService.jsfile()

  }
  playSongById(id) {
    this.songService.getSongById(id).subscribe((songsFromBE) => {
      this.songPlayList.push(songsFromBE);

    });
  }
 getAllCreatedSongbyUser() {
   this.songService.getAll(this.currentUser.id).subscribe((songsFromBE) => {
     this.songs = songsFromBE;
     this.jsService.jsfile()
   });
 }
  logout() {
    this.authenticationService.logout();
    this.getAllSong()
  }
  getAllSong() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSongAllUser = songs;
      this.jsService.jsfile()
    });
  }

  addToQueue(song: Song) {
    this.playService.addToQueue(song);
    this.addviews(song.id);
    this.getAllCreatedSongbyUser();
  }
}
