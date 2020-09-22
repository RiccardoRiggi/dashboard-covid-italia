import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeApplicazioneComponent } from './home-applicazione.component';

describe('HomeApplicazioneComponent', () => {
  let component: HomeApplicazioneComponent;
  let fixture: ComponentFixture<HomeApplicazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeApplicazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeApplicazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
