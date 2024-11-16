import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiraFailureComponent } from './tira-failure.component';

describe('TiraFailureComponent', () => {
  let component: TiraFailureComponent;
  let fixture: ComponentFixture<TiraFailureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiraFailureComponent]
    });
    fixture = TestBed.createComponent(TiraFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
