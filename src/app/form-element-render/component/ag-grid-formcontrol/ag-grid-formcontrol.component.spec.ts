import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridFormcontrolComponent } from './ag-grid-formcontrol.component';

describe('AgGridFormcontrolComponent', () => {
  let component: AgGridFormcontrolComponent;
  let fixture: ComponentFixture<AgGridFormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridFormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
