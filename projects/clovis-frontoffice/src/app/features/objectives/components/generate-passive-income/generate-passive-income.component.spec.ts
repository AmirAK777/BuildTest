import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePassiveIncomeComponent } from './generate-passive-income.component';

describe('GeneratePassiveIncomeComponent', () => {
  let component: GeneratePassiveIncomeComponent;
  let fixture: ComponentFixture<GeneratePassiveIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePassiveIncomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePassiveIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
