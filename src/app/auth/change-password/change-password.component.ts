import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {User} from '../../model/user';
import {CustomvalidationService} from '../../service/validation/customvalidation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  currentUser: any;
  users: User[] = [];
  user: any;
  message: string = null;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private notification: NotificationService,
              private customValidator: CustomvalidationService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.changePasswordForm = this.fb.group({
      username: ['', Validators.required],
      password: '',
      newPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ''
    });
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  changePassword() {
    this.user = {
      username: this.changePasswordForm.value.username,
      password: this.changePasswordForm.value.password,
      // passwordForm: {
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };
    this.authService.changePassword(this.user, this.user.id).subscribe(() => {
      alert('Success!');
      this.router.navigateByUrl('/home');
    }, error => {
      alert('Failed!!!');
    });
    this.router.navigateByUrl('/song/list');
  }

  getAllUser() {
    this.authService.getAllUser().subscribe((listUserFromBE) =>
      this.users = listUserFromBE);
  }
}
