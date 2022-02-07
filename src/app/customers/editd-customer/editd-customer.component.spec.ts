import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdCustomerComponent } from './editd-customer.component';

describe('EditdCustomerComponent', () => {
  let component: EditdCustomerComponent;
  let fixture: ComponentFixture<EditdCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
