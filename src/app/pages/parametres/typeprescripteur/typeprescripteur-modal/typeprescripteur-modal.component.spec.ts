import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeprescripteurModalComponent } from './typeprescripteur-modal.component';

describe('TypeprescripteurModalComponent', () => {
  let component: TypeprescripteurModalComponent;
  let fixture: ComponentFixture<TypeprescripteurModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeprescripteurModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeprescripteurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
