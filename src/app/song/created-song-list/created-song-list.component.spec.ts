import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedSongListComponent } from './created-song-list.component';

describe('CreatedSongListComponent', () => {
  let component: CreatedSongListComponent;
  let fixture: ComponentFixture<CreatedSongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedSongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
