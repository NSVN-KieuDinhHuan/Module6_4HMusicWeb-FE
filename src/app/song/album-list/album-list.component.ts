import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {Album} from '../../model/album';
import {AlbumService} from '../../service/album/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  currentUser: UserToken = {};
  albums: Album[] = [];
  constructor(private albumService: AlbumService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
    this.getAllAlbumByUser();
  }
  getAllAlbumByUser() {
    this.albumService.getAllAlbum(this.currentUser.id).subscribe((albumsFromBE) => {
      this.albums = albumsFromBE;
    });
  }

}
