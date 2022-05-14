import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {
  playlistForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      category: new FormControl()
    }
  );
  currentUser: UserToken = {};

  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  create(playlistForm: FormGroup) {
    let playlist;
    if (playlistForm.valid) {
      playlist = playlistForm.value;
      if (playlist.category != null) {
        playlist.category = {
          id: playlist.category
        };
      }
    }

    // tslint:disable-next-line:no-shadowed-variable
    this.playlistService.createPlaylist(playlist, this.currentUser.id).subscribe((playlist) => {
      this.router.navigateByUrl('/playlist/list');
      alert('Created successfully!');
    }, error => {
      alert('Created failed!');
    });
  }

  get nameControl() {
    return this.playlistForm.get('name');
  }
}
