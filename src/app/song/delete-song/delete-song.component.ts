import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {

  constructor(private songService: SongService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.deletesongByid(id);
    });
  }
  deletesongByid(id) {
    this.songService.deleteSong(id).subscribe(() => {
    }, error => console.log(error));
    this.router.navigateByUrl('/song/list');
  }
  ngOnInit() {
  }

}
