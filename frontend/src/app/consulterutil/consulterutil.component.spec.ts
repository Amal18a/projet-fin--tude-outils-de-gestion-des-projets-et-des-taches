import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterutilComponent } from './consulterutil.component';

describe('ConsulterutilComponent', () => {
  let component: ConsulterutilComponent;
  let fixture: ComponentFixture<ConsulterutilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterutilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
