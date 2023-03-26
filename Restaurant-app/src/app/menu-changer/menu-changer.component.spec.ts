import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChangerComponent } from './menu-changer.component';

describe('MenuChangerComponent', () => {
  let component: MenuChangerComponent;
  let fixture: ComponentFixture<MenuChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
