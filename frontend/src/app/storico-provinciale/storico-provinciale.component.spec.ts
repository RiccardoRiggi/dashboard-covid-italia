import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoProvincialeComponent } from './storico-provinciale.component';

describe('StoricoProvincialeComponent', () => {
  let component: StoricoProvincialeComponent;
  let fixture: ComponentFixture<StoricoProvincialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoProvincialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoProvincialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
