import { Injectable } from '@angular/core';
import {JsService} from '../js.service';
declare var $: any;
declare var Swal: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showSuccessMessage(message){
    $('.html').css({"font-size": "200%"})
    $(function() {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width: 300,
      });
      Toast.fire({
        icon: 'success',
        title: message
      })
    })
  }

  fun
  showErrorMessage(message){
    $(function() {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        width:300
      });
      Toast.fire({
        icon: 'Error',
        title: message
      })
    })

  }



  constructor(private jsService: JsService) {
    this.jsService.jsfile()
  }
}
