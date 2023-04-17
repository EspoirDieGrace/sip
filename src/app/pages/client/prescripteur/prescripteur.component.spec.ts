import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescripteurComponent } from './prescripteur.component';

describe('PrescripteurComponent', () => {
  let component: PrescripteurComponent;
  let fixture: ComponentFixture<PrescripteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescripteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
