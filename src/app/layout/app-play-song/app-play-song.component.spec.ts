import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPlaySongComponent } from './app-play-song.component';

describe('AppPlaySongComponent', () => {
  let component: AppPlaySongComponent;
  let fixture: ComponentFixture<AppPlaySongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPlaySongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPlaySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
