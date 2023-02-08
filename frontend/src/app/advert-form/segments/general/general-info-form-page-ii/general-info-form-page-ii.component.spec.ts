import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoFormPageIIComponent } from './general-info-form-page-ii.component';

describe('GeneralInfoFormPageIIComponent', () => {
  let component: GeneralInfoFormPageIIComponent;
  let fixture: ComponentFixture<GeneralInfoFormPageIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoFormPageIIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormPageIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
