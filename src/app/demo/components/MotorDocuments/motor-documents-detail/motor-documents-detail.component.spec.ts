import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorDocumentsDetailComponent } from './motor-documents-detail.component';

describe('MotorDocumentsDetailComponent', () => {
  let component: MotorDocumentsDetailComponent;
  let fixture: ComponentFixture<MotorDocumentsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotorDocumentsDetailComponent]
    });
    fixture = TestBed.createComponent(MotorDocumentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
