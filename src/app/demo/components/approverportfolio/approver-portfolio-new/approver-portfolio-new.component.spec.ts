import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverPortfolioNewComponent } from './approver-portfolio-new.component';

describe('ApproverPortfolioNewComponent', () => {
  let component: ApproverPortfolioNewComponent;
  let fixture: ComponentFixture<ApproverPortfolioNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproverPortfolioNewComponent]
    });
    fixture = TestBed.createComponent(ApproverPortfolioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
