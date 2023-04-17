import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatetablissementComponent } from './catetablissement.component';

describe('CatetablissementComponent', () => {
  let component: CatetablissementComponent;
  let fixture: ComponentFixture<CatetablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatetablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatetablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
