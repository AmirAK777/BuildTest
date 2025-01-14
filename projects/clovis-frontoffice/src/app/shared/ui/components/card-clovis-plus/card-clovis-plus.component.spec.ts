import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClovisPlusComponent } from './card-clovis-plus.component';

describe('CardClovisPlusComponent', () => {
  let component: CardClovisPlusComponent;
  let fixture: ComponentFixture<CardClovisPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardClovisPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardClovisPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
