import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyStatusComponent } from './family-status.component';

describe('MyAccountComponent', () => {
  let component: FamilyStatusComponent;
  let fixture: ComponentFixture<FamilyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
