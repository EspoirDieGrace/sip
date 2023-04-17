import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCompteModalComponent } from './profil-compte-modal.component';

describe('ProfilCompteModalComponent', () => {
  let component: ProfilCompteModalComponent;
  let fixture: ComponentFixture<ProfilCompteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilCompteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilCompteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
