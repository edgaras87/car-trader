import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoFormPageVComponent } from './equipment-info-form-page-v.component';

describe('EquipmentInfoFormPageVComponent', () => {
  let component: EquipmentInfoFormPageVComponent;
  let fixture: ComponentFixture<EquipmentInfoFormPageVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoFormPageVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoFormPageVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
