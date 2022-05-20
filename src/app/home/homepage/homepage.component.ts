import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {PlayList} from '../../model/play-list';
import {SongService} from '../../service/song/song.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {JsService} from '../../service/js.service';
import {PlayService} from '../../service/playmusic/play.service';

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
  topLikeSongNumber: number[] = [];
  topLikePlaylistNumber: number[] = [];

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private jsservice: JsService,
              private playService:PlayService) {
  }

  ngOnInit() {
    this.getAllPlaylists();
    this.getAllSongs();
    this.jsservice.jsfile();
    this.getTopViewSong();
    this.getTopViewSongList();
    this.getTopLikeSongList();
    this.getTopLikePlaylist();
    this.getNewestPlaylistList();
    this. gettopLikeSongNumber();
    this.getTopLikePlaylistNumber();
  }

  getAllSongs() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSongs = songs;
      this.jsservice.jsfile();
    });
  }

  getAllPlaylists() {
    this.playlistService.getAllPlaylist().subscribe((playlists) => {
      this.allPlaylists = playlists;
      this.jsservice.jsfile();
    });
  }

  getTopViewSong() {
    this.songService.getTopViewSong().subscribe((song) => {
      this.topViewsSong = song;
      this.jsservice.jsfile();
    });
  }

  getTopViewSongList() {
    this.songService.getTopViewSongList().subscribe((songs) => {
      this.topViewSongList = songs;
      this.jsservice.jsfile();
    });
  }

  getTopLikeSongList() {
    this.songService.getTopLikeSongList().subscribe((songs) => {
      this.topLikeSongList = songs;
      this.jsservice.jsfile();
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

  gettopLikeSongNumber() {
    this.songService.getTopLikeSongNumer().subscribe((likeNumbers) => {
      this.topLikeSongNumber = likeNumbers;
    });
  }
  getTopLikePlaylistNumber() {
    this.playlistService.getTopLikePlaylistNumer().subscribe((likeNumbers) => {
      this.topLikePlaylistNumber = likeNumbers;
    });
  }
}
