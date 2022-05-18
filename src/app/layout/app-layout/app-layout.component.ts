import { Component, OnInit } from '@angular/core';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor(private  jsService:JsService) { }

  ngOnInit() {
    this.jsService.jsfile()
  }

}
