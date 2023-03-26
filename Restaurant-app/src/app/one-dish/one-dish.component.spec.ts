import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDishComponent } from './one-dish.component';

describe('OneDishComponent', () => {
  let component: OneDishComponent;
  let fixture: ComponentFixture<OneDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
