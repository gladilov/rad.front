import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureRequestsComponent } from './procedure-requests.component';

describe('ProcedureRequestsComponent', () => {
  let component: ProcedureRequestsComponent;
  let fixture: ComponentFixture<ProcedureRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
