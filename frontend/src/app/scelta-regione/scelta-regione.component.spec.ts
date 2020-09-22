import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaRegioneComponent } from './scelta-regione.component';

describe('SceltaRegioneComponent', () => {
  let component: SceltaRegioneComponent;
  let fixture: ComponentFixture<SceltaRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaRegioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
