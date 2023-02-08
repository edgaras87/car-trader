import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoFormPageIvComponent } from './equipment-info-form-page-iv.component';

describe('EquipmentInfoFormPageIvComponent', () => {
  let component: EquipmentInfoFormPageIvComponent;
  let fixture: ComponentFixture<EquipmentInfoFormPageIvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoFormPageIvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoFormPageIvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
