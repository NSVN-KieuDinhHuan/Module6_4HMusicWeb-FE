import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {ArtistService} from '../../service/artist/artist.service';
import {CategoryService} from '../../service/category/category.service';
import {Artist} from '../../model/artist';
import {Category} from '../../model/category';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/Authentication/authentication.service';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent implements OnInit {
  artist: Artist = {
    categories: null
  };
  categories: Category[] = [];
  artistForm: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      story: new FormControl(''),
      categories: new FormControl(null),
      band: new FormControl(''),
      moreInfo: new FormControl('')
    }
  );
  currentUser: UserToken = {};

  constructor(private artistService: ArtistService,
              private notificationService: NotificationService,
              private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(listCategory => {
      this.categories = listCategory;
    });
  }

  createArtist(artistForm) {
    if (artistForm.valid) {
      const artist = artistForm.value;

      this.artistService.createArtist(artist).subscribe(() => {
          this.notificationService.showMessage('success', 'Tạo mới thành công!');
        }, error => {
          this.notificationService.showMessage('error', 'Tạo mới lỗi!');
        }
      );
      artistForm.resetForm();
    } else {
      this.notificationService.showMessage('error', 'Tạo mới lỗi!');
    }
  }

}
