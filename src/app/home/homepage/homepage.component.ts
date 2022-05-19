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
    this.jsservice.jsfile();
    this.getAllPlaylists();
    this.getAllSongs();
    this.getTopViewSong();
    this.getTopViewSongList();
    this.getTopLikeSongList();
    this.getTopLikePlaylist();
    this.getNewestPlaylistList();
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

  getTopViewSong() {
    this.songService.getTopViewSong().subscribe((song) => {
      this.topViewsSong = song;
    });
  }

  getTopViewSongList() {
    this.songService.getTopViewSongList().subscribe((songs) => {
      this.topViewSongList = songs;
    });
  }

  getTopLikeSongList() {
    this.songService.getTopLikeSongList().subscribe((songs) => {
      this.topLikeSongList = songs;
    });
  }

  getTopLikePlaylist() {
    this.playlistService.getTopLikePlaylistList().subscribe((playlists) => {
      this.topLikePlaylistList = playlists;
    });
  }

  getNewestPlaylistList() {
    this.playlistService.getNewestPlaylistList().subscribe((playlists) => {
      this.topNewestPlaylistList = playlists;
    });
  }
}
