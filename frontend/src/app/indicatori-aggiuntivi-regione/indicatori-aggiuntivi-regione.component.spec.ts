import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatoriAggiuntiviRegioneComponent } from './indicatori-aggiuntivi-regione.component';

describe('IndicatoriAggiuntiviRegioneComponent', () => {
  let component: IndicatoriAggiuntiviRegioneComponent;
  let fixture: ComponentFixture<IndicatoriAggiuntiviRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatoriAggiuntiviRegioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatoriAggiuntiviRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
