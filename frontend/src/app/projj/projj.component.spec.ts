import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjjComponent } from './projj.component';

describe('ProjjComponent', () => {
  let component: ProjjComponent;
  let fixture: ComponentFixture<ProjjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
