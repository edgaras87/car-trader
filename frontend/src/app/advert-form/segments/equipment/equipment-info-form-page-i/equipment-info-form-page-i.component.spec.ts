import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoFormPageIComponent } from './equipment-info-form-page-i.component';

describe('EquipmentInfoFormPageIComponent', () => {
  let component: EquipmentInfoFormPageIComponent;
  let fixture: ComponentFixture<EquipmentInfoFormPageIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoFormPageIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoFormPageIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
