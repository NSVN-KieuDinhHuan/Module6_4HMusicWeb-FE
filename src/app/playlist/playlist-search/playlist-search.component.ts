import { Component, OnInit } from '@angular/core';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html',
  styleUrls: ['./playlist-search.component.css']
})
export class PlaylistSearchComponent implements OnInit {

  constructor(private jsService:JsService) {  }

  ngOnInit() {
    this.jsService.jsfile()
  }

}
