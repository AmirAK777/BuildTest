import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClovisClubComponent } from './clovis-club.component';

describe('ClovisClubComponent', () => {
  let component: ClovisClubComponent;
  let fixture: ComponentFixture<ClovisClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClovisClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClovisClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
