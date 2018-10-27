import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOrdersComponent } from './booking-orders.component';

describe('BookingOrdersComponent', () => {
  let component: BookingOrdersComponent;
  let fixture: ComponentFixture<BookingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
