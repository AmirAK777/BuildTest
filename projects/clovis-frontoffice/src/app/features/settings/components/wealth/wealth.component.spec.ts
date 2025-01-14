import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WealthComponent } from './wealth.component';


describe('IncomeComponent', () => {
  let component: WealthComponent;
  let fixture: ComponentFixture<WealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
