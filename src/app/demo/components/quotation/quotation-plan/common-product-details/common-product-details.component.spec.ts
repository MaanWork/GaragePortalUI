import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProductDetailsComponent } from './common-product-details.component';

describe('CommonProductDetailsComponent', () => {
  let component: CommonProductDetailsComponent;
  let fixture: ComponentFixture<CommonProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonProductDetailsComponent]
    });
    fixture = TestBed.createComponent(CommonProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
