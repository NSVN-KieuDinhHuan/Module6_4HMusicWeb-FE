import { Injectable } from '@angular/core';
import {JsService} from '../js.service';
declare var $: any;
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showMessage(icon, title) {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      swal(
        {
          position: 'top',
          type: icon,
          title: title,
          showConfirmButton: false,
          timer: 1500,
        }
      );
    });
  }



  constructor(private jsService: JsService) {
    this.jsService.jsfile()
  }
}
