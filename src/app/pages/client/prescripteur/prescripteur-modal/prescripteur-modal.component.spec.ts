import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescripteurModalComponent } from './prescripteur-modal.component';

describe('PrescripteurModalComponent', () => {
  let component: PrescripteurModalComponent;
  let fixture: ComponentFixture<PrescripteurModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescripteurModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescripteurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
