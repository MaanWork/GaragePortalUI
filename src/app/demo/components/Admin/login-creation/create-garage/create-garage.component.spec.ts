import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGarageComponent } from './create-garage.component';

describe('CreateGarageComponent', () => {
  let component: CreateGarageComponent;
  let fixture: ComponentFixture<CreateGarageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGarageComponent]
    });
    fixture = TestBed.createComponent(CreateGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
