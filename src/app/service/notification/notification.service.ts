import { Injectable } from '@angular/core';
declare var $: any;
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showMessage(icon: string, title: string) {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      swal(
        {
          position: 'top-end',
          type: icon,
          title,
          showConfirmButton: false,
          timer: 1500
        }
      );
    });
  }



  constructor() { }
}
