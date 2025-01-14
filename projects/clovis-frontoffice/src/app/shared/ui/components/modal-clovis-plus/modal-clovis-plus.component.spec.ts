import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClovisPlusComponent } from './modal-clovis-plus.component';

describe('ModalClovisPlusComponent', () => {
  let component: ModalClovisPlusComponent;
  let fixture: ComponentFixture<ModalClovisPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalClovisPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClovisPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
