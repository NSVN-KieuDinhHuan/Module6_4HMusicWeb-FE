import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {PlayList} from '../../model/play-list';
import {SongService} from '../../service/song/song.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allSongs: Song[] = [];
  allPlaylists: PlayList[] = [];
  topViewsSong: Song = {};
  topViewSongList: Song[] = [];
  topLikeSongList: Song[] = [];
  topLikePlaylistList: PlayList[] = [];
  topNewestPlaylistList: PlayList[] = [];

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private jsservice: JsService) {
  }

  ngOnInit() {
    this.getAllPlaylists();
    this.getAllSongs();
    this.jsservice.jsfile();
  }

  getAllSongs() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSongs = songs;
    });
  }

  getAllPlaylists() {
    this.playlistService.getAllPlaylist().subscribe((playlists) => {
      this.allPlaylists = playlists;
    });
  }


}
