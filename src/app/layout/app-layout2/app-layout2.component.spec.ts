import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayout2Component } from './app-layout2.component';

describe('AppLayout2Component', () => {
  let component: AppLayout2Component;
  let fixture: ComponentFixture<AppLayout2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayout2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
