import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFNOLComponent } from './create-fnol.component';

describe('CreateFNOLComponent', () => {
  let component: CreateFNOLComponent;
  let fixture: ComponentFixture<CreateFNOLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFNOLComponent]
    });
    fixture = TestBed.createComponent(CreateFNOLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
