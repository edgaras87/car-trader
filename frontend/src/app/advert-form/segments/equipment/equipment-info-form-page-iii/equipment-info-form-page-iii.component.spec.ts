import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoFormPageIiiComponent } from './equipment-info-form-page-iii.component';

describe('EquipmentInfoFormPageIiiComponent', () => {
  let component: EquipmentInfoFormPageIiiComponent;
  let fixture: ComponentFixture<EquipmentInfoFormPageIiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoFormPageIiiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoFormPageIiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
