import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Madre } from './madre';

describe('Madre', () => {
  let component: Madre;
  let fixture: ComponentFixture<Madre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Madre],
    }).compileComponents();

    fixture = TestBed.createComponent(Madre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
