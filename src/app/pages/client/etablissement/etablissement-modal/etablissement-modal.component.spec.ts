import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementModalComponent } from './etablissement-modal.component';

describe('EtablissementModalComponent', () => {
  let component: EtablissementModalComponent;
  let fixture: ComponentFixture<EtablissementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
