import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoFormPageIComponent } from './details-info-form-page-i.component';

describe('DetailsInfoFormPageIComponent', () => {
  let component: DetailsInfoFormPageIComponent;
  let fixture: ComponentFixture<DetailsInfoFormPageIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsInfoFormPageIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsInfoFormPageIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
