import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-app-siderbar',
  templateUrl: './app-siderbar.component.html',
  styleUrls: ['./app-siderbar.component.css']
})
export class AppSiderbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
