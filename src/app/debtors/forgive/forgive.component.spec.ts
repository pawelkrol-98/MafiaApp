import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgiveComponent } from './forgive.component';

describe('ForgiveComponent', () => {
  let component: ForgiveComponent;
  let fixture: ComponentFixture<ForgiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
