import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDealerComponent } from './create-dealer.component';

describe('CreateDealerComponent', () => {
  let component: CreateDealerComponent;
  let fixture: ComponentFixture<CreateDealerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDealerComponent]
    });
    fixture = TestBed.createComponent(CreateDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
