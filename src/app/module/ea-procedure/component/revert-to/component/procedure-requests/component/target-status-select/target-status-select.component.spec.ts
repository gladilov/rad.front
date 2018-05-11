import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetStatusSelectComponent } from './target-status-select.component';

describe('TargetStatusSelectComponent', () => {
  let component: TargetStatusSelectComponent;
  let fixture: ComponentFixture<TargetStatusSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetStatusSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
