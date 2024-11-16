import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiraSuccessComponent } from './tira-success.component';

describe('TiraSuccessComponent', () => {
  let component: TiraSuccessComponent;
  let fixture: ComponentFixture<TiraSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiraSuccessComponent]
    });
    fixture = TestBed.createComponent(TiraSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
