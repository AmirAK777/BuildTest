import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertBookingComponent } from './expert-booking.component';

describe('ExpertBookingComponent', () => {
  let component: ExpertBookingComponent;
  let fixture: ComponentFixture<ExpertBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
