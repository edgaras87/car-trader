import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAddressSearchComponent } from './google-address-search.component';

describe('GoogleAddressSearchComponent', () => {
  let component: GoogleAddressSearchComponent;
  let fixture: ComponentFixture<GoogleAddressSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAddressSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
