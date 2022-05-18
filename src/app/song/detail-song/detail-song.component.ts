import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserToken} from '../../model/user-token';
import {Song} from '../../model/song';
import {PlayService} from '../../service/playmusic/play.service';
import {JsService} from '../../service/js.service';
import {CommentSongService} from '../../service/commentSong/comment-song.service';
import {CommentPlaylist} from '../../model/comment-playlist';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentSong} from '../../model/comment-song';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
declare var $: any;
@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  currentUser: UserToken = {};
  songDetail: Song = {};
  commentSong: CommentSong[] = [];
   date = Date.now()
  commentForm: FormGroup = new FormGroup(
    {
      content: new FormControl('')
    });
  constructor(private songService: SongService,
              private router: Router,
              private playService: PlayService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private jsService: JsService,
              private commentSongService: CommentSongService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getAllCommentSong(id)
      this.detailSongByid(id);
    });
  }

  ngOnInit() {
    this.jsService.jsfile()
    this.pauseSong();

  }



  playsong(song){
    this.playService.addToQueue(song)
    $('#pause').show();
    $('#play').hide();
  }

  pauseSong(){
    this.playService.pausePlaylist()
    $('#pause').hide();
    $('#play').show();
  }

  detailSongByid(id) {
    this.songService.getSongById(id).subscribe(songBE => {
      this.songDetail = songBE;
    }, error => console.log(error));
  }

  getAllCommentSong(songId) {
    this.commentSongService.getAllCommentBySongId(songId).subscribe((comments) => {
      this.commentSong = comments;
    });
  }

  createNewCommentSong(commentForm) {
    this.commentSongService.createNewComment(this.songDetail.id, this.currentUser.id, commentForm.value).subscribe(() => {
      this.commentForm.get('content').setValue('');
      alert('comment successfully!');
    });
  }
}
