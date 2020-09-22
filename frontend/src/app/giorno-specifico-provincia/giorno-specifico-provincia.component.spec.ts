import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiornoSpecificoProvinciaComponent } from './giorno-specifico-provincia.component';

describe('GiornoSpecificoProvinciaComponent', () => {
  let component: GiornoSpecificoProvinciaComponent;
  let fixture: ComponentFixture<GiornoSpecificoProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiornoSpecificoProvinciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiornoSpecificoProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
