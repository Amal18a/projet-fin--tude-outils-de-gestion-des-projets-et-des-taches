import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuuComponent } from './apercuu.component';

describe('ApercuuComponent', () => {
  let component: ApercuuComponent;
  let fixture: ComponentFixture<ApercuuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApercuuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApercuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
