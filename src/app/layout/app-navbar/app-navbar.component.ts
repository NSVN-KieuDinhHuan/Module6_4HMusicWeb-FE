import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  currentUser: UserToken = {};
  q = '';

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private  jsService: JsService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.jsService.jsfile()
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/home');
  }
}
