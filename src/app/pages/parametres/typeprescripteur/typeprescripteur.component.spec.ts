import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeprescripteurComponent } from './typeprescripteur.component';

describe('TypeprescripteurComponent', () => {
  let component: TypeprescripteurComponent;
  let fixture: ComponentFixture<TypeprescripteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeprescripteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeprescripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
