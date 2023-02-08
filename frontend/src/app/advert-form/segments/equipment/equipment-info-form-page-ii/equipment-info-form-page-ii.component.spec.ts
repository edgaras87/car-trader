import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfoFormPageIiComponent } from './equipment-info-form-page-ii.component';

describe('EquipmentInfoFormPageIiComponent', () => {
  let component: EquipmentInfoFormPageIiComponent;
  let fixture: ComponentFixture<EquipmentInfoFormPageIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInfoFormPageIiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentInfoFormPageIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
