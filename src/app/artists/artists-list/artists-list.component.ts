import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Artist} from '../../model/artist';
import {ArtistService} from '../../service/artist/artist.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {JsService} from '../../service/js.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.css']
})
export class ArtistsListComponent implements OnInit {
  currentUser: UserToken = {};
  allArtists: Artist[] = [];
  constructor(private artistService: ArtistService,
              private authenticationService: AuthenticationService,
              private jsService: JsService,
              private songService: SongService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllArtists();
    this.jsService.jsfile();
  }
  getAllArtists() {
    this.artistService.getAllArtist().subscribe((artists) => {
      this.allArtists = artists;
    });
  }
}
