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
import {ArtistService} from '../../service/artist/artist.service';
import {Artist} from '../../model/artist';
import {AlbumService} from '../../service/album/album.service';
import {Album} from '../../model/album';
import {TagService} from '../../service/tag/tag.service';
import {Tag} from '../../model/tag';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  categories: Category[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tags: Tag[] = [];
  currentUser: UserToken = {};
  song: Song = {};

  constructor(private songService: SongService,
              private categorySevice: CategoryService,
              private artistService: ArtistService,
              private albumService: AlbumService,
              private tagService: TagService,
              private fb: FormBuilder,
              private notificationSevice: NotificationService,
              private router: Router,
              private jsService:JsService,
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
  getAllArtist() {
    this.artistService.getAllArtist().subscribe((ArtistFromBE) => {
      this.artists = ArtistFromBE;
    });
  }

  getAllAlbum() {
    this.albumService.getAllAlbum().subscribe((albumFromBE) => {
      this.albums = albumFromBE;
    });
  }

  getAllTag() {
    this.tagService.getAllTag().subscribe((tagFromBE) => {
      this.tags = tagFromBE;
    });
  }
  ngOnInit() {
    this.getAllCategory();
    this.getAllArtist();
    this.getAllAlbum();
    this.getAllTag();
    this.jsService.jsfile()
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
        this.notificationSevice.showSuccessMessage('Success');
        this.router.navigateByUrl("/song/list")
      }, error => this.notificationSevice.showErrorMessage('Error'));
      songForm.resetForm();
    }
  }
}
