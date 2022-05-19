import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {Artist} from '../../model/artist';
import {Album} from '../../model/album';
import {Tag} from '../../model/tag';
import {UserToken} from '../../model/user-token';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {CategoryService} from '../../service/category/category.service';
import {ArtistService} from '../../service/artist/artist.service';
import {AlbumService} from '../../service/album/album.service';
import {TagService} from '../../service/tag/tag.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {JsService} from '../../service/js.service';
declare var $: any;
@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {

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
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationSevice: NotificationService,
              private authenticationService: AuthenticationService,
              private jsService:JsService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getSongById(id);
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

  getSongById(id) {
    this.songService.getSongById(id).subscribe(songBE => {
      this.song = songBE;
      this.SongFormControl.id.setValue(this.song.id);
      this.SongFormControl.name.setValue(this.song.name);
      this.SongFormControl.description.setValue(this.song.description);
      this.SongFormControl.category.setValue(this.song.category.id);
      this.SongFormControl.artist.setValue(this.song.artist.id);
      this.SongFormControl.album.setValue(this.song.album.id);
      this.SongFormControl.tag.setValue(this.song.tag.id);

      // tslint:disable-next-line:only-arrow-functions
      $('.file-upload-audio').attr('src', 'http://localhost:8080/image/' + this.song.mp3File);
      $('.image-title-audio').html(this.song.mp3File);
      $('.file-upload-content-audio').show();
      $('.image-upload-wrap-audio').hide();
      $('.file-upload-image').attr('src', 'http://localhost:8080/image/' + this.song.image);
      $('.image-title').html(this.song.image);
      $('.file-upload-content').show();
      $('.image-upload-wrap').hide();
    });
  }

  get SongFormControl() {
    return this.songForm.controls;
  }
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
    this.jsService.jsfile();
  }
  submit(songForm) {
    const formData = new FormData();
    formData.append('name', songForm.value.name);
    formData.append('description', songForm.value.description);
    formData.append('author', songForm.value.author);
    formData.append('category', songForm.value.category);
    formData.append('artist', songForm.value.artist);
    formData.append('album', songForm.value.album);
    formData.append('tag', songForm.value.tag);
    const files = (document.getElementById('image') as HTMLInputElement).files;
    if (files.length > 0) {
      formData.append('image', files[0]);
    }
    const mp3Files = (document.getElementById('mp3File') as HTMLInputElement).files;
    if (mp3Files.length > 0) {
      formData.append('mp3File', mp3Files[0]);
    }
    this.songService.editSong(this.currentUser.id, this.song.id, formData).subscribe(() => {
      this.router.navigateByUrl("song/list");
      alert('Thành công!');
    }, error => console.log(error));

  }
}
