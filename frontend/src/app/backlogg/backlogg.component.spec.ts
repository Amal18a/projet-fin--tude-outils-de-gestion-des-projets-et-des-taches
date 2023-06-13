import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackloggComponent } from './backlogg.component';

describe('BackloggComponent', () => {
  let component: BackloggComponent;
  let fixture: ComponentFixture<BackloggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackloggComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackloggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
