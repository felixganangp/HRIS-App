import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchableSelectInput } from './searchable-select-input';

describe('SearchableSelectInput', () => {
  let component: SearchableSelectInput;
  let fixture: ComponentFixture<SearchableSelectInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableSelectInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchableSelectInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
