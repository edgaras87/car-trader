import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoFormPageIiComponent } from './details-info-form-page-ii.component';

describe('DetailsInfoFormPageIiComponent', () => {
  let component: DetailsInfoFormPageIiComponent;
  let fixture: ComponentFixture<DetailsInfoFormPageIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsInfoFormPageIiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsInfoFormPageIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
