import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoFormPageIiiComponent } from './general-info-form-page-iii.component';

describe('GeneralInfoFormPageIiiComponent', () => {
  let component: GeneralInfoFormPageIiiComponent;
  let fixture: ComponentFixture<GeneralInfoFormPageIiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoFormPageIiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormPageIiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
