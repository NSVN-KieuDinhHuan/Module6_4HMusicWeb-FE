import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class JsService {

  constructor() { }

  jsfile(){
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
}
