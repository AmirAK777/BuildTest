import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalSituationComponent } from './professional-situation.component';


describe('MyAccountComponent', () => {
  let component: ProfessionalSituationComponent;
  let fixture: ComponentFixture<ProfessionalSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalSituationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
