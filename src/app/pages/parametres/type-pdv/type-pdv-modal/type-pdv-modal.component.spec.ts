import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePdvModalComponent } from './type-pdv-modal.component';

describe('TypePdvModalComponent', () => {
  let component: TypePdvModalComponent;
  let fixture: ComponentFixture<TypePdvModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePdvModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePdvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
