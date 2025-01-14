import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeDeclarationsComponent } from './optimize-declarations.component';

describe('GrowSavingsComponent', () => {
  let component: OptimizeDeclarationsComponent;
  let fixture: ComponentFixture<OptimizeDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizeDeclarationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizeDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
