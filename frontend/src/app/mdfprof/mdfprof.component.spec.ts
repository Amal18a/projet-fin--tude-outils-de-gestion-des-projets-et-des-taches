import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdfprofComponent } from './mdfprof.component';

describe('MdfprofComponent', () => {
  let component: MdfprofComponent;
  let fixture: ComponentFixture<MdfprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdfprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdfprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
