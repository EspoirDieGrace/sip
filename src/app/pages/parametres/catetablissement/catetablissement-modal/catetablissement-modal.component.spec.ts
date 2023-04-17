import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatetablissementModalComponent } from './catetablissement-modal.component';

describe('CatetablissementModalComponent', () => {
  let component: CatetablissementModalComponent;
  let fixture: ComponentFixture<CatetablissementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatetablissementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatetablissementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
