import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnolHomeComponent } from './fnol-home.component';

describe('FnolHomeComponent', () => {
  let component: FnolHomeComponent;
  let fixture: ComponentFixture<FnolHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FnolHomeComponent]
    });
    fixture = TestBed.createComponent(FnolHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
