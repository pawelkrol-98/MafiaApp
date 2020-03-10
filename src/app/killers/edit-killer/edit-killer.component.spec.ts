import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKillerComponent } from './edit-killer.component';

describe('EditKillerComponent', () => {
  let component: EditKillerComponent;
  let fixture: ComponentFixture<EditKillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
