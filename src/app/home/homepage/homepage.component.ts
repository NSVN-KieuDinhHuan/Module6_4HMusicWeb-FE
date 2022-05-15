import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {PlayList} from '../../model/play-list';
import {SongService} from '../../service/song/song.service';
import {PlaylistService} from '../../service/playlist/playlist.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allSongs: Song[] = [];
  allPlaylists: PlayList[] = [];
  mostViewsSong: Song = {};
  mostViewsPlaylist: PlayList = {};

  constructor(private songService: SongService,
              private playlistService: PlaylistService) {
    this.getMostViewPlaylist();
  }

  ngOnInit() {
    this.getAllPlaylists();
    this.getAllSongs();
    // this.getMostViewPlaylist();
  }

  getAllSongs() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSongs = songs;
    });
  }

  getAllPlaylists() {
    this.playlistService.getAllPlaylist().subscribe((playlists) => {
      this.allPlaylists = playlists;
      // let mostViewPlaylist = playlists[0];
      // // tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < playlists.length; i++) {
      //   if (mostViewPlaylist.views < playlists[i].views) {
      //     mostViewPlaylist = playlists[i];
      //   }
      // }
      // this.mostViewsPlaylist = mostViewPlaylist;
    });
  }

  getMostViewPlaylist() {
    let allPlaylists;
    this.playlistService.getAllPlaylist().subscribe((playlists) => {
      allPlaylists = playlists;
      let mostViewPlaylist = allPlaylists[0];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < allPlaylists.length; i++) {
        if (mostViewPlaylist.views < allPlaylists[i].views) {
          mostViewPlaylist = allPlaylists[i];
        }
      }
      this.mostViewsPlaylist = mostViewPlaylist;
    });
  }

}
