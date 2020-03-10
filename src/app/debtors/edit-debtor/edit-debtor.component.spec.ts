import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDebtorComponent } from './edit-debtor.component';

describe('EditDebtorComponent', () => {
  let component: EditDebtorComponent;
  let fixture: ComponentFixture<EditDebtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDebtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
