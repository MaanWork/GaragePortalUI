import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YakeenSearchComponent } from './yakeen-search.component';

describe('YakeenSearchComponent', () => {
  let component: YakeenSearchComponent;
  let fixture: ComponentFixture<YakeenSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YakeenSearchComponent]
    });
    fixture = TestBed.createComponent(YakeenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
