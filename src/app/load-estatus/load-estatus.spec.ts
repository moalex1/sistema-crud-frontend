import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEstatus } from './load-estatus';

describe('LoadEstatus', () => {
  let component: LoadEstatus;
  let fixture: ComponentFixture<LoadEstatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadEstatus],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadEstatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
