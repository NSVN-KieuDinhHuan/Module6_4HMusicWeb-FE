import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {Song} from '../../model/song';
import {Artist} from '../../model/artist';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {JsService} from '../../service/js.service';
import {SongService} from '../../service/song/song.service';
import {ArtistService} from '../../service/artist/artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  currentUser: UserToken = {};
  artist: Artist = {};
  allSong: Song[] = [];
  constructor(private artistService: ArtistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private jsService: JsService,
              private songService: SongService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getArtistById(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllSong();
    this.jsService.jsfile();
  }
  getArtistById(id) {
    this.artistService.getArtistById(id).subscribe((artist) => {
      this.artist = artist;
    });
  }
  getAllSong() {
    this.songService.getAllSongForAllArtist(this.artist.id).subscribe((songs) => {
      this.allSong = songs;
    });
  }

}
