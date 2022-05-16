import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/song/list');
  }
  register() {
    this.router.navigateByUrl('/auth/register');
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
}
