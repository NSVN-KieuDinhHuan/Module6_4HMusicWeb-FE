import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  currentUser: UserToken = {};
  playlist: PlayList = {};
  allSong: Song[] = [];

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private songService: SongService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllSong();
  }

  getPlaylistById(id) {
    this.playlistService.getPlaylistById(id).subscribe((playlist) => {
      this.playlist = playlist;
    });
  }

  getAllSong() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSong = songs;
    });
  }

  addSong(songId: number, playlistId: number) {
    this.playlistService.addSongToPlaylist(songId, playlistId).subscribe(() => {
      this.router.navigateByUrl(`/playlist/detail/${playlistId}`);
      alert('Add song successfully!');
    }, error => {
      alert('Failed');
    });
  }
  removeSong(songId: number, playlistId: number) {
    this.playlistService.removeSongFromPlaylist(songId, playlistId).subscribe(() => {
      this.router.navigateByUrl(`/playlist/detail/${playlistId}`);
      alert('Remove song successfully!');
    }, error => {
      alert('Failed');
    });
  }
}
