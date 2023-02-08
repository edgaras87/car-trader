import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoFormPageIiComponent } from './contact-info-form-page-ii.component';

describe('ContactInfoFormPageIiComponent', () => {
  let component: ContactInfoFormPageIiComponent;
  let fixture: ComponentFixture<ContactInfoFormPageIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoFormPageIiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfoFormPageIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
