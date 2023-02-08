import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoFormPageIComponent } from './contact-info-form-page-i.component';

describe('ContactInfoFormPageIComponent', () => {
  let component: ContactInfoFormPageIComponent;
  let fixture: ComponentFixture<ContactInfoFormPageIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoFormPageIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfoFormPageIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
