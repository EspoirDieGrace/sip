import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTransactionModalComponent } from './type-transaction-modal.component';

describe('TypeTransactionModalComponent', () => {
  let component: TypeTransactionModalComponent;
  let fixture: ComponentFixture<TypeTransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTransactionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
