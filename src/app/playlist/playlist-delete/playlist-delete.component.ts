import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/Authentication/authentication.service';

@Component({
  selector: 'app-playlist-delete',
  templateUrl: './playlist-delete.component.html',
  styleUrls: ['./playlist-delete.component.css']
})
export class PlaylistDeleteComponent implements OnInit {

  currentUser: UserToken = {};
  playlist: PlayList = {};

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  getPlaylistById(id) {
    this.playlistService.getPlaylistById(id).subscribe((playlist) => {
      this.playlist = playlist;
    });
  }

  deletePlaylist(id) {
    this.playlistService.deletePlaylist(id).subscribe(() => {
      this.router.navigateByUrl(`/playlist/list`);
      alert('Deleted successfully!');
    }, error => {
      alert('Edited failed!');
    });
  }

}
