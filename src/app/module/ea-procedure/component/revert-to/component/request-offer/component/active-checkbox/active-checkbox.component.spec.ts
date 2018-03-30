import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCheckboxComponent } from './active-checkbox.component';

describe('ActiveCheckboxComponent', () => {
  let component: ActiveCheckboxComponent;
  let fixture: ComponentFixture<ActiveCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
