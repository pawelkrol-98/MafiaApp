import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTargetComponent } from './set-target.component';

describe('SetTargetComponent', () => {
  let component: SetTargetComponent;
  let fixture: ComponentFixture<SetTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
