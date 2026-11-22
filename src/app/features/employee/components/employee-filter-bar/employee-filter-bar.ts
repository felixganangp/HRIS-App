import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchableSelectInput } from '../../../../shared/components/searchable-select-input/searchable-select-input';

export interface EmployeeFilterChange {
  searchQuery?: string;
  selectedGroup?: string;
  selectedStatus?: string;
}

const ALL_GROUPS_OPTION = 'All Groups';

@Component({
  imports: [CommonModule, SearchableSelectInput],
  selector: 'app-employee-filter-bar',
  templateUrl: './employee-filter-bar.html',
})
export class EmployeeFilterBar {
  // Inputs
  readonly searchQuery = input<string>('');
  readonly selectedGroup = input<string>('');
  readonly selectedStatus = input<string>('');
  readonly groups = input.required<string[]>();
  readonly statuses = input.required<string[]>();

  // Outputs
  readonly filterChange = output<EmployeeFilterChange>();
  readonly resetFilters = output<void>();

  readonly groupOptions = computed(() => [ALL_GROUPS_OPTION, ...this.groups()]);

  readonly groupDisplayValue = computed(() => {
    const current = this.selectedGroup();
    return current ? current : ALL_GROUPS_OPTION;
  });

  readonly hasActiveFilters = computed(() => {
    return !!(this.searchQuery().trim() || this.selectedGroup() || this.selectedStatus());
  });

  onSearchInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.filterChange.emit({ searchQuery });
  }

  onGroupValueChange(selectedOption: string): void {
    const selectedGroup = selectedOption === ALL_GROUPS_OPTION ? '' : selectedOption;
    this.filterChange.emit({ selectedGroup });
  }

  onStatusChange(event: Event): void {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this.filterChange.emit({ selectedStatus });
  }
}
