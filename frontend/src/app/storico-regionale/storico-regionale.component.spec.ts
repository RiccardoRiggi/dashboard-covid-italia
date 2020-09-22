import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoRegionaleComponent } from './storico-regionale.component';

describe('StoricoRegionaleComponent', () => {
  let component: StoricoRegionaleComponent;
  let fixture: ComponentFixture<StoricoRegionaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoRegionaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoRegionaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
