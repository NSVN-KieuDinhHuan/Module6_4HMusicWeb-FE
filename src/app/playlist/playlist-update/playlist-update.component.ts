import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../model/user-token';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayList} from '../../model/play-list';

class Playlist {
}

@Component({
  selector: 'app-playlist-update',
  templateUrl: './playlist-update.component.html',
  styleUrls: ['./playlist-update.component.css']
})
export class PlaylistUpdateComponent implements OnInit {
  currentUser: UserToken = {};
  playlist: PlayList = {};
  playlistForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      category: new FormControl(),
      description: new FormControl()
    }
  );


  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
    });
  }

  ngOnInit() {
  }

  getPlaylistById(id) {
    this.playlistService.getPlaylistById(id).subscribe((playlist) => {
      this.playlist = playlist;
      this.playlistForm.get('name').setValue(playlist.name);
      this.playlistForm.get('description').setValue(playlist.description);
      // this.playlistForm.get('category').setValue(playlist.category);
    });
  }

  edit(id, playlistForm: FormGroup) {
    let playlist;
    if (playlistForm.valid) {
      playlist = playlistForm.value;
      if (playlist.category != null) {
        playlist.category = {
          id: playlist.category
        };
      }
    }
    this.playlistService.editPlaylist(playlist, id).subscribe(() => {
      this.router.navigateByUrl(`/playlist/detail/${id}`);
      alert('Edit successfully!');
    }, error => {
      alert('Edited failed!');
    });
  }

  get nameControl() {
    return this.playlistForm.get('name');
  }

}
