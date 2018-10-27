import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOrdersInnerComponent } from './booking-orders-inner.component';

describe('BookingOrdersInnerComponent', () => {
  let component: BookingOrdersInnerComponent;
  let fixture: ComponentFixture<BookingOrdersInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOrdersInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOrdersInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
