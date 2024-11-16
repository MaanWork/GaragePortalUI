import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortQuoteComponent } from './short-quote.component';

describe('ShortQuoteComponent', () => {
  let component: ShortQuoteComponent;
  let fixture: ComponentFixture<ShortQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortQuoteComponent]
    });
    fixture = TestBed.createComponent(ShortQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
