import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFilterBar } from './employee-filter-bar';

describe('EmployeeFilterBar', () => {
  let component: EmployeeFilterBar;
  let fixture: ComponentFixture<EmployeeFilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFilterBar],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFilterBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
