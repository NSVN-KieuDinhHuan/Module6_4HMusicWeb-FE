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

  getAllUser() {
    this.authService.getAllUser().subscribe((listUserBackEnd) =>
      this.users = listUserBackEnd);
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
}
