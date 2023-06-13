import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OublierComponent } from './oublier.component';

describe('OublierComponent', () => {
  let component: OublierComponent;
  let fixture: ComponentFixture<OublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OublierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
