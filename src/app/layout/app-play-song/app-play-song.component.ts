import {Component, Input, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-app-play-song',
  templateUrl: './app-play-song.component.html',
  styleUrls: ['./app-play-song.component.css']
})
export class AppPlaySongComponent implements OnInit {

  constructor(private  jsService:JsService) { }

  ngOnInit() {
    this.jsService.jsfile()
  }

}
