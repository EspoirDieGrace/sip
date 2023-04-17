import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePdvComponent } from './type-pdv.component';

describe('TypePdvComponent', () => {
  let component: TypePdvComponent;
  let fixture: ComponentFixture<TypePdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
