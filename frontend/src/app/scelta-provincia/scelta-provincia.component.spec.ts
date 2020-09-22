import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltaProvinciaComponent } from './scelta-provincia.component';

describe('SceltaProvinciaComponent', () => {
  let component: SceltaProvinciaComponent;
  let fixture: ComponentFixture<SceltaProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceltaProvinciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltaProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
