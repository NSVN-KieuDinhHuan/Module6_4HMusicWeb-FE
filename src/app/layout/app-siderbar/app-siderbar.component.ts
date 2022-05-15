import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-siderbar',
  templateUrl: './app-siderbar.component.html',
  styleUrls: ['./app-siderbar.component.css']
})
export class AppSiderbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  listSong() {
    this.router.navigateByUrl('/song/list');
  }

}
