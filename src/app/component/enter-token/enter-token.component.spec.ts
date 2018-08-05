import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTokenComponent } from './enter-token.component';

describe('EnterTokenComponent', () => {
  let component: EnterTokenComponent;
  let fixture: ComponentFixture<EnterTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
