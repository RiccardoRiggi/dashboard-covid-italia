import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditiComponent } from './crediti.component';

describe('CreditiComponent', () => {
  let component: CreditiComponent;
  let fixture: ComponentFixture<CreditiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
