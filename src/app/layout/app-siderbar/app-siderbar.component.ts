import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';
declare var $: any;
@Component({
  selector: 'app-app-siderbar',
  templateUrl: './app-siderbar.component.html',
  styleUrls: ['./app-siderbar.component.css']
})
export class AppSiderbarComponent implements OnInit {

  constructor(private router: Router,private jsService:JsService) { }

  ngOnInit() {
    this.jsService.jsfile()
  }


  clickHome(){
    $('#home').addClass("active");
    $('#song').removeClass('active');


  }

  clickSong(){
    $('#home').removeClass('active');
    $('#song').addClass("active");
  }
}
