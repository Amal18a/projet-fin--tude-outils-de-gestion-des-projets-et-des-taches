import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojComponent } from './addproj.component';

describe('AddprojComponent', () => {
  let component: AddprojComponent;
  let fixture: ComponentFixture<AddprojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprojComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
