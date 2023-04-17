import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegueModalComponent } from './delegue-modal.component';

describe('DelegueModalComponent', () => {
  let component: DelegueModalComponent;
  let fixture: ComponentFixture<DelegueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
