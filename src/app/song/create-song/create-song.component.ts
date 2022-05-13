// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../service/notification/notification.service';
import {CategoryService} from '../../service/category/category.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  categories: Category[] = [];
  currentUser: UserToken = {};
  song: Song = {};

  constructor(private songService: SongService,
              private categorySevice: CategoryService,
              private fb: FormBuilder,
              private notificationSevice: NotificationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  songForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    mp3File: new FormControl(''),
    image: new FormControl(''),
    author: new FormControl(''),
    category: new FormControl(null),
    artist: new FormControl(null),
    album: new FormControl(null),
    tag: new FormControl(null)
  });

  getAllCategory() {
    this.categorySevice.getAllCategory().subscribe((categoriesFromBE) => {
      this.categories = categoriesFromBE;
    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  get SongFormControl() {
    return this.songForm.controls;
  }

  createSong(songForm) {
    const formData = new FormData();
    formData.append('name', songForm.value.name);
    formData.append('description', songForm.value.description);
    formData.append('mp3File', (document.getElementById('mp3File') as HTMLInputElement).files[0]);
    formData.append('image', (document.getElementById('image') as HTMLInputElement).files[0]);
    formData.append('author', songForm.value.author);
    formData.append('category', songForm.value.category);
    formData.append('artist', songForm.value.artist);
    formData.append('album', songForm.value.album);
    formData.append('tag', songForm.value.tag);
    if (songForm.valid) {
      this.songService.createSong(formData, this.currentUser.id).subscribe(() => {
        this.notificationSevice.showMessage('success', 'Tạo mới thành công!');
      }, error => this.notificationSevice.showMessage('lỗi', 'Tạo mới thất bại!'));
      songForm.resetForm();
    }
  }
}
