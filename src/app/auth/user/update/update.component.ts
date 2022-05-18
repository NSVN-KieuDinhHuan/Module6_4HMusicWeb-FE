import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/Authentication/authentication.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {UserToken} from '../../../model/user-token';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    image: new FormControl('')
  });
  id: number;
  user: User = {};
  message: string = null;
  imageUrl: any;
  imageFile: any;
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
              ) {
    // Router là đối tượng giúp chuyển trang bên phía ts
    // ActivatedRoute để lấy ra giá trị của biến id
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUserById(this.id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.updateForm = this.fb.group({
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      image: []
    });
  }


  getUserById(id) {
    this.authService.getUserById(id).subscribe((users) => {
      this.user = users;
      this.usernameControl.setValue(this.user.username);
      this.phoneNumberControl.setValue(this.user.phoneNumber);
      this.addressControl.setValue(this.user.address);
      this.imageControl.setValue(this.user.image);
    });
    this.imageUrl = this.user.image;
  }


  get idControl() {
    return this.updateForm.get('id');
  }

  get usernameControl() {
    return this.updateForm.get('username');
  }

  get phoneNumberControl() {
    return this.updateForm.get('phoneNumber');
  }

  get addressControl() {
    return this.updateForm.get('address');
  }

  get imageControl() {
    return this.updateForm.get('image');
  }


  editUser() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('username', this.updateForm.value.username);
      formData.append('phoneNumber', this.updateForm.value.phoneNumber);
      formData.append('address', this.updateForm.value.address);
      if (this.imageFile != null) {
        formData.append('image', this.imageFile);
      }
      this.authService.editUser(this.currentUser.id, formData).subscribe(() => {
        alert('Sửa thành công!');
      }, error => {
        alert('Sửa lỗi!');
      });
      this.updateForm.reset();
    } else {
      alert('Chưa đúng validate!');
    }
  }
  file($event) {
    this.imageFile = $event.target.files[0];
  }

}
