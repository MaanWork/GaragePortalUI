import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalQuoteDetailsComponent } from './personal-quote-details.component';

describe('PersonalQuoteDetailsComponent', () => {
  let component: PersonalQuoteDetailsComponent;
  let fixture: ComponentFixture<PersonalQuoteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalQuoteDetailsComponent]
    });
    fixture = TestBed.createComponent(PersonalQuoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
