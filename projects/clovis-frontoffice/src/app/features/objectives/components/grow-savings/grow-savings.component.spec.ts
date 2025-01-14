import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowSavingsComponent } from './grow-savings.component';

describe('GrowSavingsComponent', () => {
  let component: GrowSavingsComponent;
  let fixture: ComponentFixture<GrowSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowSavingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
