import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiornoSpecificoNazioneComponent } from './giorno-specifico-nazione.component';

describe('GiornoSpecificoNazioneComponent', () => {
  let component: GiornoSpecificoNazioneComponent;
  let fixture: ComponentFixture<GiornoSpecificoNazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiornoSpecificoNazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiornoSpecificoNazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
