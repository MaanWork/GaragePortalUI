import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReInsuranceComponent } from './re-insurance.component';

describe('ReInsuranceComponent', () => {
  let component: ReInsuranceComponent;
  let fixture: ComponentFixture<ReInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReInsuranceComponent]
    });
    fixture = TestBed.createComponent(ReInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
