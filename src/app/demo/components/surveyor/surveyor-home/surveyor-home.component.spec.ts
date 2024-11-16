import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyorHomeComponent } from './surveyor-home.component';

describe('SurveyorHomeComponent', () => {
  let component: SurveyorHomeComponent;
  let fixture: ComponentFixture<SurveyorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyorHomeComponent]
    });
    fixture = TestBed.createComponent(SurveyorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
