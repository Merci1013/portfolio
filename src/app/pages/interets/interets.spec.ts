import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interets } from './interets';

describe('Interets', () => {
  let component: Interets;
  let fixture: ComponentFixture<Interets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Interets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
