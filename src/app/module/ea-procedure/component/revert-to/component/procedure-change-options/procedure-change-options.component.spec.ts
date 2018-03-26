import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureChangeOptionsComponent } from './procedure-change-options.component';

describe('ProcedureChangeOptionsComponent', () => {
  let component: ProcedureChangeOptionsComponent;
  let fixture: ComponentFixture<ProcedureChangeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureChangeOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureChangeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
