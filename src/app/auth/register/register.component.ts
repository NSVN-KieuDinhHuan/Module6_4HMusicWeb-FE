import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: any;
  users: User[] = [];
  message: string = null;
  // imageFile: any;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getAllUser();
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

// Tạo user không có ảnh
  register() {
    this.user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: this.registerForm.value.address
    };
    for (const user of this.users) {
      if (user.username === this.user.username) {
        this.message = 'Account is already exists';
        break;
      }
    }
    this.authService.register(this.user).subscribe(() => {
      this.router.navigateByUrl('/song/list');
    });
  }

  // tạo user có ảnh
  // register2() {
  //   if (this.registerForm.valid) {
  //     const formData = new FormData();
  //     formData.append('username', this.registerForm.value.username);
  //     formData.append('password', this.registerForm.value.password);
  //     formData.append('confirmPassword', this.registerForm.value.confirmPassword);
  //     if (this.imageFile != null) {
  //       formData.append('image', this.imageFile);
  //     }
  //     formData.append('phoneNumber', this.registerForm.value.phoneNumber);
  //     formData.append('address', this.registerForm.value.address);
  //     this.authService.register2(formData).subscribe(() => {
  //         alert('Successfully!');
  //       }, error => {
  //         alert('Failed!');
  //       }
  //     );
  //     this.registerForm.reset();
  //   } else {
  //     alert('Validate Error!');
  //   }
  //   this.authService.register2(this.user).subscribe(() => {
  //     this.router.navigateByUrl('/login');
  //   });
  // }
  //
  // get usernameCreate() {
  //   return this.registerForm.get('username');
  // }
  //
  // get passwordCreate() {
  //   return this.registerForm.get('password');
  // }
  //
  // get confirmPasswordCreate() {
  //   return this.registerForm.get('confirmPassword');
  // }
  //
  // get phoneNumberCreate() {
  //   return this.registerForm.get('phoneNumber');
  // }
  //
  // get addressCreate() {
  //   return this.registerForm.get('address');
  // }

  getAllUser() {
    this.authService.getAllUser().subscribe((listUserBackEnd) =>
      this.users = listUserBackEnd);
  }

  // file($event) {
  //   this.imageFile = $event.target.files[0];
  // }
}
