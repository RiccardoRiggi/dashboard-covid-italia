import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNazioneComponent } from './home-nazione.component';

describe('HomeNazioneComponent', () => {
  let component: HomeNazioneComponent;
  let fixture: ComponentFixture<HomeNazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeNazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
