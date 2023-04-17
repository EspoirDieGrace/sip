import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AministrateurModalComponent } from './aministrateur-modal.component';

describe('AministrateurModalComponent', () => {
  let component: AministrateurModalComponent;
  let fixture: ComponentFixture<AministrateurModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AministrateurModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AministrateurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
