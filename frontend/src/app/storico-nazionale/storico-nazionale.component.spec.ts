import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoNazionaleComponent } from './storico-nazionale.component';

describe('StoricoNazionaleComponent', () => {
  let component: StoricoNazionaleComponent;
  let fixture: ComponentFixture<StoricoNazionaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoNazionaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoNazionaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
