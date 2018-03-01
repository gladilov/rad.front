import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertToComponent } from './revert-to.component';

describe('RevertToComponent', () => {
  let component: RevertToComponent;
  let fixture: ComponentFixture<RevertToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
