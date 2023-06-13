import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinttComponent } from './sprintt.component';

describe('SprinttComponent', () => {
  let component: SprinttComponent;
  let fixture: ComponentFixture<SprinttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprinttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprinttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
