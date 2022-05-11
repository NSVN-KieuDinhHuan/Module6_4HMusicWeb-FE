import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSiderbarComponent } from './app-siderbar.component';

describe('AppSiderbarComponent', () => {
  let component: AppSiderbarComponent;
  let fixture: ComponentFixture<AppSiderbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSiderbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
