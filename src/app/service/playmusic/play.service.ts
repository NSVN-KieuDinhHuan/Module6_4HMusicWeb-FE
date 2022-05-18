import { Injectable } from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../song/song.service';
declare var $: any;
declare var jPlayerPlaylist: any;
declare var clip: any;
declare var mapToScale: any;
@Injectable({
  providedIn: 'root'
})
export class PlayService {
  songlist = [];
  myPlaylist  = new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, this.songlist, {
    swfPath: "js/plugins",
    supplied: "oga, mp3",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    playlistOptions: {
      autoPlay: true
    }
  });


  constructor(private songService:SongService) { }

  convertSongBEToSongPlayer(songs: Song[], myPlayListOtion){
    for (let i = 0; i < songs.length; i++) {
      let song = this.convertSong(songs[i], myPlayListOtion);
      this.songlist.push(song);
    }
  }

  convertSong(song, myPlayListOtion){
    return  {
      image : 'http://localhost:8080/image/' + song.image,
      title: song.name,
      artist: song.artist.name,
      mp3: 'http://localhost:8080/image/' + song.mp3File,
      oga: '',
      option : myPlayListOtion
    };
  }
  pausePlaylist(){
    this.myPlaylist.pause()
  }
  checkSongExsit(songplayer){
    var playlist = this.myPlaylist.playlist;
    var indexValue=-1;
    $.each(playlist, function(index, obj) {
      if (songplayer.title == obj.title) {
        indexValue=index
      }
    });
   return indexValue;
  }
  addviews(songID){
    this.songService.addview(songID).subscribe(() => {
    });
  }
  addToQueue(song){
    this.configVolume()
    var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';
    let songPlayer= this.convertSong(song, myPlayListOtion);
    if (this.checkSongExsit(songPlayer)==-1){
      this.songlist.push(songPlayer)
      this.myPlaylist.setPlaylist(this.songlist);
      this.myPlaylist.play(-1);
    }else {
      this.myPlaylist.play(this.checkSongExsit(songPlayer));
    }
    var current = this.myPlaylist.current;
    var playlist = this.myPlaylist.playlist;
    $.each(playlist, function(index, obj) {
      if (index == current) {
        $(".jp-now-playing").html("<div class='jp-track-name'><span class='que_img'><img style='width: 50px' src='"+obj.image+"'></span><div class='que_data'>" + obj.title + " <div class='jp-artist-name'>" + obj.artist + "</div></div></div>");
      }
    });

    $('.knob-wrapper').mousedown(function() {
      $(window).mousemove(function(e) {
        var angle1 = getRotationDegrees($('.knob')),
          volume = angle1 / 270

        if (volume > 1) {
          $("#jquery_jplayer_1").jPlayer("volume", 1);
        } else if (volume <= 0) {
          $("#jquery_jplayer_1").jPlayer("mute");
        } else {
          $("#jquery_jplayer_1").jPlayer("volume", volume);
          $("#jquery_jplayer_1").jPlayer("unmute");
        }
      });

      return false;
    }).mouseup(function() {
      $(window).unbind("mousemove");
    });


    function getRotationDegrees(obj) {
      var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
      if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { var angle = 0; }
      return (angle < 0) ? angle + 360 : angle;
    }

    var timeDrag = false;
    $('.jp-play-bar').mousedown(function(e) {
      timeDrag = true;
      updatebar(e.pageX);

    });
    $(document).mouseup(function(e) {
      if (timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
      }
    });
    $(document).mousemove(function(e) {
      if (timeDrag) {
        updatebar(e.pageX);
      }
    });
    var updatebar = function(x) {
      var progress = $('.jp-progress');
      var position = x - progress.offset().left;
      var percentage = 100 * position / progress.width();
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      $("#jquery_jplayer_1").jPlayer("playHead", percentage);
      $('.jp-play-bar').css('width', percentage + '%');
    };
    $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function() {
      $('#playlist-wrap').fadeToggle();
      $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
    });
    $('.hide_player').unbind().on('click', function() {
      $('.audio-player').toggleClass('is_hidden');
      $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
    });
    $('body').unbind().on('click', '.audio-play-btn', () => {
      $('.audio-play-btn').removeClass('is_playing');
      $(this).addClass('is_playing');
      var playlistId = $(this).data('playlist-id');
      this.myPlaylist.play(playlistId);
    });

  }



 configVolume(){
    $(function(){
      $.event.special.drag = {
        setup: function() {
          var element = $(this),
            previousEvent = null,
            $document = $(document)

          var mousemove = function(e) {
            e.pageX = e.pageX || e.layerX
            e.pageY = e.pageY || e.layerY
            e.speedX = e.pageX - previousEvent.pageX
            e.speedY = e.pageY - previousEvent.pageY
            e.deltaX = e.speedX + previousEvent.deltaX
            e.deltaY = e.speedY + previousEvent.deltaY


            element.trigger("drag",e)
            previousEvent = e
          }
          var mouseup = function(e) {
            $document.off("mouseup")
            $document.off("mousemove")

            e.pageX = e.pageX || e.layerX
            e.pageY = e.pageY || e.layerY
            e.speedX = e.pageX - previousEvent.pageX
            e.speedY = e.pageY - previousEvent.pageY
            e.deltaX = e.deltaX + previousEvent.deltaX
            e.deltaY = e.deltaY + previousEvent.deltaY

            element.trigger("dragend", e)
          }
          var touchend = function(e) {
            e.preventDefault()

            e.offsetX = e.pageX-getOffset(e.target).left
            e.offsetY = e.pageY-getOffset(e.target).top
            e.speedX = e.pageX - previousEvent.pageX
            e.speedY = e.pageY - previousEvent.pageY
            e.deltaX = e.deltaX + previousEvent.deltaX
            e.deltaY = e.deltaY + previousEvent.deltaY

            element.trigger("dragend", e)
          }

          function getOffset(obj) {
            var offsetLeft = 0;
            var offsetTop = 0;
            do {
              if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
              }
              if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
              }
            } while(obj = obj.offsetParent );

            return {left: offsetLeft, top: offsetTop};
          }

          element.on("touchstart.drag mousedown.drag", function(e) {
            e.preventDefault()

            if (!e.originalEvent.changedTouches) {
              // mouse
              $document.on("mousemove", mousemove)
              $document.on("mouseup", mouseup)
            }
            e.pageX = e.pageX || e.layerX ||  e.originalEvent.changedTouches[0].pageX
            e.pageY = e.pageY || e.layerY ||  e.originalEvent.changedTouches[0].pageY
            e.offsetX = e.offsetX || e.pageX-getOffset(e.target).left
            e.offsetY = e.offsetY || e.pageY-getOffset(e.target).top


            e.speedX = 0
            e.speedY = 0
            e.deltaX = 0
            e.deltaY = 0

            element.trigger("draginit", e)
            previousEvent = e
          })
          element.on("touchmove.drag", function(e) {
            e.preventDefault()

            e.pageX = e.pageX || e.layerX ||  e.originalEvent.changedTouches[0].pageX
            e.pageY = e.pageY || e.layerY ||  e.originalEvent.changedTouches[0].pageY
            e.offsetX = e.pageX-getOffset(e.target).left
            e.offsetY = e.pageY-getOffset(e.target).top
            e.speedX = e.pageX - previousEvent.pageX
            e.speedY = e.pageY - previousEvent.pageY
            e.deltaX = e.speedX + previousEvent.deltaX
            e.deltaY = e.speedY + previousEvent.deltaY

            // do now allow two touch points to drag the same element
            if (e.originalEvent.targetTouches.length > 1) return

            element.trigger("drag",e)
            previousEvent = e

          })
          element.on("touchend.drag", touchend)
          element.on("touchcancel.drag", touchend)


        },
        teardown: function() {
          var element = $(this)
          element.off("touchstart.drag")
          element.off("touchmove.drag")
          element.off("touchend.drag")
          element.off("touchcancel.drag")
          element.off("mousedown.drag")
          element.off("mouseup.drag")
        }
      }

      const init = function(){

        var widget = $('.widget'),
          wrapper = widget.find('.knob-wrapper'),
          knob = widget.find('.knob'),
          handle = widget.find('.handle'),
          input = widget.find('input'),
          range = {
            min: 0,
            max: 1
          },
          absolute = true

        knob.rotation = 0

        var offR = 0,
          offX = 0,
          offY = 0;

        wrapper.on('draginit', function(e, data) {

          var w = data.target.clientWidth,
            h = data.target.clientHeight,
            x = data.offsetX - w / 2,
            y = data.offsetY - h / 2,
            angle = Math.atan2(-y, -x) * 180 / Math.PI + 45,
            r = angle < -90 ? angle + 360 : angle

          r = (angle > -90 && angle < -45) ? 270 : r
          r = clip(r, [0, 270])

          offX = x
          offY = y

          knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          knob.rotation = r

          if (r > 180) {
            knob.addClass('d3')
          } else if (r > 90) {
            knob.removeClass('d3').addClass('d2')
          } else {
            knob.removeClass('d3 d2')
          }

          var v = mapToScale(r, [0, 270], [range.min, range.max])

          widget.trigger('sync')
          widget.showValue(v)


          offR = knob.rotation
        })

        wrapper.on('drag', function(e, data) {


          var w = data.target.clientWidth,
            h = data.target.clientHeight,
            x = data.deltaX + offX,
            y = data.deltaY + offY,
            angle = Math.atan2(-y, -x) * 180 / Math.PI + 45,
            r = angle < -90 ? angle + 360 : angle
          r = (angle > -90 && angle < -45) ? 270 : r
          r = clip(r, [0, 270])

          knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          knob.rotation = r

          if (r > 180) {
            knob.addClass('d3')
          } else if (r > 90) {
            knob.removeClass('d3').addClass('d2')
          } else {
            knob.removeClass('d3 d2')
          }

          var v = mapToScale(r, [0, 270], [range.min, range.max])

          widget.trigger('sync')
          widget.showValue(v)

        })

        widget.getValue = function() {
          return mapToScale(knob.rotation, [0, 270], [range.min, range.max])
        }

        widget.setValue = function(v, send, sync) {
          var r = mapToScale(v, [range.min, range.max], [0, 270])
          knob.rotation = r

          if (r > 180) {
            knob.addClass('d3')
          } else if (r > 90) {
            knob.removeClass('d3').addClass('d2')
          } else {
            knob.removeClass('d3 d2')
          }

          knob[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          handle[0].setAttribute('style', 'transform:rotateZ(' + r + 'deg)')
          var v = widget.getValue() || v

          widget.showValue(v)

          if (sync) widget.trigger('sync')
        }
        widget.showValue = function(v) {
          input.val(v)
        }

        input.change(function() {
          widget.setValue(input.val(), true, true)
        })

        clip = function(value, range) {
          var max = Math.max,
            min = Math.min,
            value: any = parseFloat(value)
          if (isNaN(value)) value = range[0]

          return max(min(range[0], range[1]), min(parseFloat(value), max(range[0], range[1])))

        }

        // map a value from a scale to another input and output must be range arrays
        mapToScale = function(value, rangeIn, rangeOut, reverse) {

          var max = Math.max,
            min = Math.min,
            round = Math.round,
            value = clip(value, [rangeIn[0], rangeIn[1]])

          value = ((value - rangeIn[0]) / (rangeIn[1] - rangeIn[0])) * (rangeOut[1] - rangeOut[0]) + rangeOut[0]

          if (reverse) value = max(rangeOut[0], rangeOut[1]) + min(rangeOut[0], rangeOut[1]) - value

          value = max(min(rangeOut[0], rangeOut[1]), min(value, max(rangeOut[0], rangeOut[1])))

          value = round(value * 100) / 100

          return value

        }

      }

      init()
    })
  }
}
