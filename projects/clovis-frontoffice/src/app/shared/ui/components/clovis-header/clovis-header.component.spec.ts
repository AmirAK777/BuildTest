import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClovisHeaderComponent } from './clovis-header.component';

describe('ClovisHeaderComponent', () => {
  let component: ClovisHeaderComponent;
  let fixture: ComponentFixture<ClovisHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClovisHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClovisHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
