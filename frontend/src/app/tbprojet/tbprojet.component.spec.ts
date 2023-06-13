import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbprojetComponent } from './tbprojet.component';

describe('TbprojetComponent', () => {
  let component: TbprojetComponent;
  let fixture: ComponentFixture<TbprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
