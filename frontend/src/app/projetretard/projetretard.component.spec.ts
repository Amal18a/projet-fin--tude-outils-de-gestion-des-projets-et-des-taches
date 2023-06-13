import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetretardComponent } from './projetretard.component';

describe('ProjetretardComponent', () => {
  let component: ProjetretardComponent;
  let fixture: ComponentFixture<ProjetretardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetretardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetretardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
