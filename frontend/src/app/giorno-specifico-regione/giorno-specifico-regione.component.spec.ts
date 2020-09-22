import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiornoSpecificoRegioneComponent } from './giorno-specifico-regione.component';

describe('GiornoSpecificoRegioneComponent', () => {
  let component: GiornoSpecificoRegioneComponent;
  let fixture: ComponentFixture<GiornoSpecificoRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiornoSpecificoRegioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiornoSpecificoRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
