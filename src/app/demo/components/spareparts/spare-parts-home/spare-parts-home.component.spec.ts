import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartsHomeComponent } from './spare-parts-home.component';

describe('SparePartsHomeComponent', () => {
  let component: SparePartsHomeComponent;
  let fixture: ComponentFixture<SparePartsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SparePartsHomeComponent]
    });
    fixture = TestBed.createComponent(SparePartsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
