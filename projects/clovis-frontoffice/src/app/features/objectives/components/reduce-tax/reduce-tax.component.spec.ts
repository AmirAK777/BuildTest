import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceTaxComponent } from './reduce-tax.component';

describe('ReduceTaxComponent', () => {
  let component: ReduceTaxComponent;
  let fixture: ComponentFixture<ReduceTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReduceTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReduceTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
