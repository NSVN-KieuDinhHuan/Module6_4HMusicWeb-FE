import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {CommentPlaylist} from '../../model/comment-playlist';
import {CommentPlaylistService} from '../../service/commentPlaylist/comment-playlist.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  currentUser: UserToken = {};
  playlist: PlayList = {};
  allSong: Song[] = [];
  commentPlaylists: CommentPlaylist[] = [];
  commentForm: FormGroup = new FormGroup(
    {
      content: new FormControl('', [Validators.required])
    }
  );

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private songService: SongService,
              private router: Router,
              private commentPlaylistService: CommentPlaylistService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
      this.getAllCommentPlaylist(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllSong();
  }

  getPlaylistById(id) {
    this.playlistService.getPlaylistById(id).subscribe((playlist) => {
      this.playlist = playlist;
    });
  }

  getAllSong() {
    this.songService.getAllSongForAllUser().subscribe((songs) => {
      this.allSong = songs;
    });
  }

  addSong(songId: number, playlistId: number) {
    this.playlistService.addSongToPlaylist(songId, playlistId).subscribe((playlist) => {
      this.getPlaylistById(playlistId);
      alert('Add song successfully!');
    }, error => {
      alert('Failed');
    });
  }

  removeSong(songId: number, playlistId: number) {
    this.playlistService.removeSongFromPlaylist(songId, playlistId).subscribe(() => {
      this.getPlaylistById(playlistId);
      alert('Remove song successfully!');
    }, error => {
      alert('Failed');
    });
  }

  getAllCommentPlaylist(playlistId) {
    this.commentPlaylistService.getAllCommentPlaylist(playlistId).subscribe((comments) => {
      this.commentPlaylists = comments;
    });
  }

  createNewComment(commentForm) {
    this.commentPlaylistService.createNewComment(this.playlist.id, this.currentUser.id, commentForm.value).subscribe(() => {
      this.commentForm.get('content').setValue('');
      this.getAllCommentPlaylist(this.playlist.id);
      alert('comment successfully!');
    });
  }
}
