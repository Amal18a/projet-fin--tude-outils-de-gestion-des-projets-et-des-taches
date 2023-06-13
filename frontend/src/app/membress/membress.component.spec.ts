import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembressComponent } from './membress.component';

describe('MembressComponent', () => {
  let component: MembressComponent;
  let fixture: ComponentFixture<MembressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
