import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnolListingComponent } from './fnol-listing.component';

describe('FnolListingComponent', () => {
  let component: FnolListingComponent;
  let fixture: ComponentFixture<FnolListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FnolListingComponent]
    });
    fixture = TestBed.createComponent(FnolListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
