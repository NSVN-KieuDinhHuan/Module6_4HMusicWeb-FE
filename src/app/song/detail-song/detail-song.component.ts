import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {Song} from '../../model/song';
import {PlayService} from '../../service/playmusic/play.service';
declare var $: any;
@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  currentUser: UserToken = {};
  songDetail: Song = {};
  constructor(private songService: SongService,
              private router: Router,
              private playService: PlayService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.detailSongByid(id);
    });
  }

  ngOnInit() {
  }
  playsong(song){
    this.playService.addToQueue(song)
    $('#pause').show();
    $('#play').hide();
  }

  pauseSong(){
    this.playService.pausePlaylist()
    $('#pause').hide();
    $('#play').show();
  }
  detailSongByid(id) {
    this.songService.getSongById(id).subscribe(songBE => {
      this.songDetail = songBE;
    }, error => console.log(error));
  }
}
