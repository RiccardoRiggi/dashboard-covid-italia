import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRegioneComponent } from './home-regione.component';

describe('HomeRegioneComponent', () => {
  let component: HomeRegioneComponent;
  let fixture: ComponentFixture<HomeRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRegioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
