import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoFormPageIComponent } from './general-info-form-page-i.component';

describe('GeneralInfoFormPageIComponent', () => {
  let component: GeneralInfoFormPageIComponent;
  let fixture: ComponentFixture<GeneralInfoFormPageIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoFormPageIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormPageIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
