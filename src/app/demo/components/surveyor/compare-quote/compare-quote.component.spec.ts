import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareQuoteComponent } from './compare-quote.component';

describe('CompareQuoteComponent', () => {
  let component: CompareQuoteComponent;
  let fixture: ComponentFixture<CompareQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareQuoteComponent]
    });
    fixture = TestBed.createComponent(CompareQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
