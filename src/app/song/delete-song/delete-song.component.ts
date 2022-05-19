import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Song} from '../../model/song';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {
 song: Song;
  constructor(private songService: SongService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private  jsService: JsService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.songService.getSongById(id).subscribe((be)=> {
        this.song=be;
      });
    });
  }
  deletesongByid(id) {
    this.songService.deleteSong(id).subscribe(() => {
      this.router.navigateByUrl(`/song/list`);
    }, error => console.log(error));
    this.router.navigateByUrl('/song/list');
  }
  ngOnInit() {
    this.jsService.jsfile()
  }

}
