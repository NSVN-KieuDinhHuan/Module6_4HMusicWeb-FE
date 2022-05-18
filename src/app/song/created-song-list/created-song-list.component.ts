import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {PlayService} from '../../service/playmusic/play.service';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-created-song-list',
  templateUrl: './created-song-list.component.html',
  styleUrls: ['./created-song-list.component.css']
})
export class CreatedSongListComponent implements OnInit {

  currentUser: UserToken = {};
  songs: Song[] = [];
  songPlayList: Song[] = [];
  constructor(private songService: SongService,
              private authenticationService: AuthenticationService,
              private playService: PlayService,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllCreatedSongbyUser();
    this.playService.configVolume();
    $(function(){
      $(".ms_more_icon").on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (typeof $(this).attr('data-other') != 'undefined') {
          var target = $(this).parent().parent();
        } else {
          var target = $(this).parent();
        }
        if (target.find("ul.more_option").hasClass('open_option')) {
          target.find("ul.more_option").removeClass('open_option');
        } else {
          $("ul.more_option.open_option").removeClass('open_option');
          target.find("ul.more_option").addClass('open_option');
        }
      });
      $(document).on("click", function(e) {
        $("ul.more_option.open_option").removeClass("open_option");
      })
      // On Button Click
      $(".ms_btn.play_btn").on('click', function() {
        $('.ms_btn.play_btn').toggleClass('btn_pause');
      });
      $(document).on('click', '#playlist-wrap ul li .action .que_more', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#playlist-wrap ul li .action .que_more').not($(this)).closest('li').find('.more_option').removeClass('open_option');
        $(this).closest('li').find('.more_option').toggleClass('open_option');
      });
      // $('.jp-playlist').on('click', function(){
      // $('#playlist-wrap ul li .more_option').removeClass('open_option');
      // });

      $(document).on('click', function(e) {
        if (!$(e.target).closest('.more_option').length && !$(e.target).closest('.action').length) {
          $('#playlist-wrap .more_option').removeClass('open_option');
        }
        if (!$(e.target).closest('#playlist-wrap').length && !$(e.target).closest('.jp_queue_wrapper').length && !$(e.target).closest('.player_left').length) {
          $('#playlist-wrap').hide();
        }
      });
      //
      $('.jp_queue_cls').on('click', function(e) {
        $('#playlist-wrap').hide();
      });


    })

  }
  playSongById(id) {
    this.songService.getSongById(id).subscribe((songsFromBE) => {
      this.songPlayList.push(songsFromBE);

    });
  }
 getAllCreatedSongbyUser() {
   this.songService.getAll(this.currentUser.id).subscribe((songsFromBE) => {
     this.songs = songsFromBE;
   });
 }
  logout() {
    this.authenticationService.logout();
  }


  addToQueue(song: Song) {
    this.playService.addToQueue(song);
  }
}
