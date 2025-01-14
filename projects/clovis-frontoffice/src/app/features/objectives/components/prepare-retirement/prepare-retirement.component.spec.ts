import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareRetirementComponent } from './prepare-retirement.component';

describe('PrepareRetirementComponent', () => {
  let component: PrepareRetirementComponent;
  let fixture: ComponentFixture<PrepareRetirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareRetirementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrepareRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
