import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangermdComponent } from './changermd.component';

describe('ChangermdComponent', () => {
  let component: ChangermdComponent;
  let fixture: ComponentFixture<ChangermdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangermdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangermdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
