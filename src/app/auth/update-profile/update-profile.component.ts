import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {JsService} from '../../service/js.service';
declare var $: any;
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User = {};
  currentUser: UserToken = {};
  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('')
  });
  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private jsService:JsService
  ) {
    // Router là đối tượng giúp chuyển trang bên phía ts
    // ActivatedRoute để lấy ra giá trị của biến id
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getUserById(id);

    });
  }


  ngOnInit() {
    this.jsService.jsfile()
  }

  get updateFormControl() {

    return this.updateForm.controls;
  }
  getUserById(id) {
    this.authService.getUserById(id).subscribe((users) => {
      this.user = users;
      this.updateFormControl.username.setValue(this.user.username);
      this.updateFormControl.phoneNumber.setValue(this.user.phoneNumber);
      this.updateFormControl.address.setValue(this.user.address);
      if(this.user.image!=null){
        $('#userImage').attr('src', 'http://localhost:8080/image/' + this.user.image);
      }
    });
  }
  submit() {
    const formData = new FormData();
    formData.append('username', this.updateForm.value.username);
    formData.append('phoneNumber', this.updateForm.value.phoneNumber);
    formData.append('address', this.updateForm.value.address);

    const files = (document.getElementById('image') as HTMLInputElement).files;
    if (files.length > 0) {
      formData.append('image', files[0]);
    }
    this.authService.editUser(this.currentUser.id, formData).subscribe(() => {
      this.router.navigateByUrl("song/list")
    }, error => console.log(error));

  }
}
