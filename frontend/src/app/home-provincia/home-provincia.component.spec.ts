import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProvinciaComponent } from './home-provincia.component';

describe('HomeProvinciaComponent', () => {
  let component: HomeProvinciaComponent;
  let fixture: ComponentFixture<HomeProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProvinciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
