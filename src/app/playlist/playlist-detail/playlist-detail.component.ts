import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../model/play-list';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {JsService} from '../../service/js.service';
import {CommentPlaylist} from '../../model/comment-playlist';
import {CommentPlaylistService} from '../../service/commentPlaylist/comment-playlist.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LikePlaylistService} from '../../service/likePlaylist/like-playlist.service';
import {LikePlaylist} from '../../model/like-playlist';

declare var $: any;

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
  likePlaylist: LikePlaylist = {};
  likePlaylistList: LikePlaylist[] = [];
  commentForm: FormGroup = new FormGroup(
    {
      content: new FormControl('', [Validators.required])
    }
  );

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private jsService: JsService,
              private songService: SongService,
              private router: Router,
              private commentPlaylistService: CommentPlaylistService,
              private likePlaylistService: LikePlaylistService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.getPlaylistById(id);
      this.getAllCommentPlaylist(id);
      this.getLikePlaylist(id);
      this.getAllLikePlaylist(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllSong();
    this.jsService.jsfile()
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

  getLikePlaylist(playlistId) {
    this.likePlaylistService.getLikePlaylist(playlistId, this.currentUser.id).subscribe((likePlaylist) => {
      this.likePlaylist = likePlaylist;
    });
  }

  getAllLikePlaylist(playlistId) {
    this.likePlaylistService.getAllLikePlaylist(playlistId).subscribe((likePlaylistList) => {
      this.likePlaylistList = likePlaylistList;
    });
  }

  changeLikeIcon() {
    $('#likeIcon').style({'background-position': '-592px 6px'});
  }

  addLike() {
    this.likePlaylistService.addLike(this.playlist.id, this.currentUser.id).subscribe(() => {
      this.getAllLikePlaylist(this.playlist.id);
      this.getLikePlaylist(this.playlist.id);
      $('#likeIcon').hide();
      $('#unlikeIcon').show();
    });
  }
  removeLike() {
    this.likePlaylistService.deleteLike(this.playlist.id, this.currentUser.id).subscribe(() => {
      this.getAllLikePlaylist(this.playlist.id);
      this.getLikePlaylist(this.playlist.id);
      $('#likeIcon').show();
      $('#unlikeIcon').hide();
    });
  }
  changeLikeStatus() {
    this.likePlaylistService.changeLikeStatus(this.playlist.id, this.currentUser.id).subscribe(() => {
      console.log('successfully!');
    });
  }

}
